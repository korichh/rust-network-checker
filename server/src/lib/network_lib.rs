use std::{
    process::Output,
    sync::{
        atomic::{AtomicUsize, Ordering},
        Arc,
    },
};
use tokio::{
    process::Command,
    sync::{mpsc, Semaphore},
};

pub async fn clean_arp() {
    let _ = Command::new("powershell")
        .arg("arp -d")
        .output()
        .await
        .unwrap();
}

pub async fn ping_lan(subnet: String, tasks_limit: usize) -> mpsc::Receiver<usize> {
    let permits = Arc::new(Semaphore::new(tasks_limit));
    let count = Arc::new(AtomicUsize::new(0));

    let (tx, rx) = mpsc::channel(100);

    for i in 1..255 {
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
        .arg(format!("ping -n 1 -w 1 -l 1 -i 1 {}", ip))
        .output()
        .await
        .unwrap();
}

pub async fn get_arp(main_ip: String) -> Output {
    return Command::new("powershell")
        .arg(format!("arp -a -N {} | Select-String \"192.168\"", main_ip))
        .output()
        .await
        .unwrap();
}

// let mut ping_rx = ping_lan(String::from("192.168.0"), 25).await;
// while let Some(count_tx) = ping_rx.recv().await {
//     println!("Progress: ping {}/255", count_tx);
// }
