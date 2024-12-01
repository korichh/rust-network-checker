use axum::{
    extract::ws::{Message, WebSocketUpgrade},
    response::Response,
};

use crate::ws::handlers::main_handler;

pub async fn get(ws: WebSocketUpgrade) -> Response {
    return ws.on_upgrade(|mut socket| async move {
        while let Some(Ok(msg)) = socket.recv().await {
            if let Message::Text(text) = msg {
                match text.as_str() {
                    "hello" => main_handler::hello(&mut socket, text).await,
                    _ => (),
                }
            } else {
                break;
            }
        }
    });
}
