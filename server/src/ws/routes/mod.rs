pub mod main_routes;

use axum::Router;

pub fn get() -> Router {
    return Router::new().nest("/", main_routes::get());
}
