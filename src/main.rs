use axum::{serve, Router};
use tokio::net::TcpListener;

mod config;
mod controllers;
mod routes;

use crate::config::main::get_config;
use crate::routes::api::router as api_router;
use crate::routes::main::router as main_router;

#[tokio::main]
async fn main() {
    let config = get_config();

    let app = Router::new()
        .nest("/api", api_router())
        .nest("/", main_router());
    let addr = format!("{}:{}", &config.host, &config.port);
    let listener = TcpListener::bind(&addr).await.unwrap();

    println!("Server is running at http://{}", &addr);
    serve(listener, app).await.unwrap();
}
