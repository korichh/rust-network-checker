pub mod handlers;
pub mod routes;

use axum::Router;

pub async fn create() -> Router {
    return routes::get();
}
