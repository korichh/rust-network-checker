pub mod config_routes;

use axum::Router;

pub fn get() -> Router {
    return Router::new().nest("/config", config_routes::get());
}
