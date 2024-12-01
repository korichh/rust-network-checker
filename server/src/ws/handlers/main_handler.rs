use axum::{
    extract::ws::{Message, WebSocket, WebSocketUpgrade},
    response::Response,
};

pub async fn get(ws: WebSocketUpgrade) -> Response {
    return ws.on_upgrade(handle_socket);
}

async fn handle_socket(mut socket: WebSocket) {
    while let Some(Ok(msg)) = socket.recv().await {
        match msg {
            Message::Text(text) => {
                let reply = format!("{} from server!", text);

                if socket.send(Message::Text(reply)).await.is_err() {
                    eprintln!("Error sending message. Client disconnected?");
                    break;
                }
            }
            Message::Binary(_) => {
                eprintln!("Binary messages are not supported.");
            }
            Message::Close(_) => {
                eprintln!("Client closed the connection.");
                break;
            }
            _ => {
                eprintln!("Unsupported message type received.");
            }
        }
    }
}
