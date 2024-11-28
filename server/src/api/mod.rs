pub mod controllers;
pub mod routes;

use axum::Router;
use tokio::net::TcpListener;

use crate::config;

pub async fn create() {
    let config = config::get();

    let api = Router::new().nest("/api", routes::get());
    let address = format!("{}:{}", &config.api_host, &config.api_port);
    let listener = TcpListener::bind(&address).await.unwrap();

    println!("API is listening at http://{}", &address);
    axum::serve(listener, api).await.unwrap();
}
