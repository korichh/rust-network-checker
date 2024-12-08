use axum::extract::ws::{Message, WebSocket};

use crate::api::services::options_service;
use crate::utils::network_utils::{clean_arp, get_arp, ping_lan};

pub async fn ping(socket: &mut WebSocket, _: String) {
    let mut message: String;
    let options = options_service::get();
    let subnet = options.subnet.unwrap();
    let tasks_limit = options.tasks_limit.unwrap();
    let range_start = options.range_start.unwrap();
    let range_end = options.range_end.unwrap();

    message = "loading".to_string();
    send_message(socket, &message).await;

    message = "Progress: cleaning net".to_string();
    send_message(socket, &message).await;
    clean_arp().await;

    let mut ping_rx = ping_lan(
        subnet.clone(),
        tasks_limit.clone(),
        range_start.clone(),
        range_end.clone(),
    )
    .await;
    while let Some(count_tx) = ping_rx.recv().await {
        message = format!("Progress: ping {}/{}", range_start + count_tx, range_end);
        send_message(socket, &message).await;
    }

    message = "Progress: retrieving data".to_string();
    send_message(socket, &message).await;

    message = "arp".to_string() + &get_arp(subnet.clone()).await;
    send_message(socket, &message).await;
}

async fn send_message(socket: &mut WebSocket, message: &String) {
    socket
        .send(Message::Text(message.to_string()))
        .await
        .unwrap();
}
