pub mod api;
pub mod config;
// pub mod lib;
pub mod ws;

#[tokio::main]
pub async fn main() {
    api::create().await;
    ws::create().await;
}
