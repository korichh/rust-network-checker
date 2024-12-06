use axum::extract::ws::{Message, WebSocket};

use crate::lib::network_lib::{clean_arp, get_arp, ping_lan};

pub async fn ping(socket: &mut WebSocket, _: String) {
    let mut message: String;

    message = "loading".to_string();
    send_message(socket, &message).await;

    message = "Progress: cleaning arp".to_string();
    clean_arp().await;
    send_message(socket, &message).await;

    let mut ping_rx = ping_lan("192.168.0".to_string(), 15).await;
    while let Some(count_tx) = ping_rx.recv().await {
        message = format!("Progress: ping {}/255", count_tx);
        send_message(socket, &message).await;
    }

    message = "loading".to_string();
    send_message(socket, &message).await;

    message = "arp".to_string();
    send_message(socket, &message).await;

    message = get_arp().await;
    send_message(socket, &message).await;
}

async fn send_message(socket: &mut WebSocket, message: &String) {
    socket
        .send(Message::Text(message.to_string()))
        .await
        .unwrap();
}
