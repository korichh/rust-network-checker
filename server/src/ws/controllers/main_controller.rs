use axum::{
    extract::ws::{Message, WebSocketUpgrade},
    response::Response,
};

use crate::ws::handlers::main_handler;

pub async fn get(ws: WebSocketUpgrade) -> Response {
    return ws.on_upgrade(|mut socket| async move {
        while let Some(Ok(msg)) = socket.recv().await {
            match msg {
                Message::Text(text) => match text.as_str() {
                    "ping" => main_handler::ping(&mut socket, text).await,
                    _ => (),
                },
                _ => (),
            }
        }
    });
}
