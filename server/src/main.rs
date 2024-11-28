// use axum::{serve, Router};
// use tokio::net::TcpListener;
// use tokio::time::{sleep, Duration};

// mod config;
// mod controllers;
// mod lib;
// mod routes;

// use crate::config::main::get_config;
// use crate::lib::main::{clean_arp, ping_lan};
// use crate::routes::api::router as api_router;
// use crate::routes::main::router as main_router;

#[tokio::main]
async fn main() {
    // clean_arp().await;

    // let mut ping_rx = ping_lan(String::from("192.168.0"), 25).await;
    // while let Some(count_tx) = ping_rx.recv().await {
    //     println!("Progress: ping {}/255", count_tx);
    // }

    // let config = get_config();
    // let app = Router::new()
    //     .nest("/api", api_router())
    //     .nest("/", main_router());
    // let addr = format!("{}:{}", &config.host, &config.port);
    // let listener = TcpListener::bind(&addr).await.unwrap();

    // println!("Server is running at http://{}", &addr);
    // serve(listener, app).await.unwrap();
}
