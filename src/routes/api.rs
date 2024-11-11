use axum::{routing::get, Router};

use crate::controllers::api::Controller as ApiController;

pub fn router() -> Router {
    return Router::new().route("/", get(ApiController::get));
}
