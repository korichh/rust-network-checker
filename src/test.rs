// use std::{ops::Range, process::Output, sync::Arc};
// use tokio::{
//     process::Command as TokioCommand, sync::Semaphore as TokioSemaphore, task as TokioTask,
// };

// #[tokio::main]
// async fn main() {
//     let subnet = "192.168.0";
//     let range = 1..254;
//     let max_concurrent = 50;
//     let ip = "192.168.0.107";

//     clean_arp().await;
//     ping_lan(subnet, range, max_concurrent).await;

//     let arp_output = get_arp(ip).await;
//     println!("{}", String::from_utf8_lossy(&arp_output.stdout));
// }

// async fn clean_arp() {
//     let _ = TokioCommand::new("powershell").arg("arp -d").output().await;
// }

// async fn ping_lan(subnet: &str, range: Range<u8>, max_concurrent: usize) {
//     let semaphore = Arc::new(TokioSemaphore::new(max_concurrent));
//     let mut tasks = vec![];

//     for i in range {
//         let ip = format!("{}.{}", subnet, i);
//         let semaphore = Arc::clone(&semaphore);

//         let task = TokioTask::spawn(async move {
//             let _permit = semaphore.acquire().await.unwrap();
//             ping_ip(ip).await;
//         });

//         tasks.push(task);
//     }

//     for task in tasks {
//         let _ = task.await;
//     }
// }

// async fn ping_ip(ip: String) {
//     let _ = TokioCommand::new("powershell")
//         .arg(format!("ping -n 1 -w 1 -l 1 -i 1 {}", ip))
//         .output()
//         .await;
// }

// async fn get_arp(ip: &str) -> Output {
//     let output = TokioCommand::new("powershell")
//         .arg(format!("arp -a -N {} | Select-String \"192.168\"", ip))
//         .output()
//         .await;

//     return output.unwrap();
// }
