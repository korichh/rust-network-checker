pub mod controllers;
pub mod middlewares;
pub mod routes;
pub mod services;

use axum::Router;

pub async fn create() -> Router {
    return routes::get();
}
