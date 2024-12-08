use encoding_rs::IBM866;
use std::sync::{
    atomic::{AtomicUsize, Ordering},
    Arc,
};
use tokio::{
    process::Command,
    sync::{mpsc, Semaphore},
};

pub async fn clean_arp() {
    let _ = Command::new("powershell")
        .arg("-File")
        .arg("ps/clean_arp.ps1")
        .output()
        .await
        .unwrap();
}

pub async fn ping_lan(subnet: String, tasks_limit: usize) -> mpsc::Receiver<usize> {
    let permits = Arc::new(Semaphore::new(tasks_limit));
    let count = Arc::new(AtomicUsize::new(0));

    let (tx, rx) = mpsc::channel(100);

    for i in 100..150 {
        let ip = format!("{}.{}", subnet, i);
        let permits = Arc::clone(&permits);
        let count = Arc::clone(&count);
        let tx = tx.clone();

        tokio::spawn(async move {
            let _permit = permits.acquire().await.unwrap();
            ping_ip(ip).await;

            let count_tx = count.fetch_add(1, Ordering::SeqCst) + 1;
            tx.send(count_tx).await.unwrap();
        });
    }

    drop(tx);
    return rx;
}

pub async fn ping_ip(ip: String) {
    let _ = Command::new("powershell")
        .arg("-File")
        .arg("ps/ping_ip.ps1")
        .arg("-ip")
        .arg(ip)
        .output()
        .await
        .unwrap();
}

pub async fn get_arp(subnet: String) -> String {
    let subnet_pattern = subnet.replace(".", "\\.");

    let output = Command::new("powershell")
        .arg("-File")
        .arg("ps/get_arp.ps1")
        .arg("-subnetPattern")
        .arg(subnet_pattern)
        .output()
        .await
        .unwrap();

    let (decoded, _, _) = IBM866.decode(&output.stdout);
    return decoded.into_owned();
}
