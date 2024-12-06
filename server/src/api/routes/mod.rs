pub mod options_routes;

use axum::Router;

pub fn get() -> Router {
    return Router::new().nest("/options", options_routes::get());
}
