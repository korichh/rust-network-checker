pub mod api;
pub mod config;
// pub mod lib;
pub mod ws;

use axum::Router;
use tokio::net::TcpListener;

#[tokio::main]
pub async fn main() {
    let config = config::get();

    let api_router = api::create().await;
    let ws_router = ws::create().await;

    let app = Router::new()
        .nest("/api", api_router)
        .nest("/ws", ws_router);
    let address = format!("{}:{}", &config.host, &config.port);
    let listener = TcpListener::bind(&address).await.unwrap();

    println!(
        "API is listening at http://{}/api\nWS is listening at ws://{}/ws",
        &address, &address
    );
    axum::serve(listener, app).await.unwrap();
}
