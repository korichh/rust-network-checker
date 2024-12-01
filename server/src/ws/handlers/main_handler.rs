use axum::extract::ws::{Message, WebSocket};

pub async fn hello(socket: &mut WebSocket, message: String) {
    let reply = format!("{} world!", message);

    socket.send(Message::Text(reply.to_string())).await.unwrap();
}
