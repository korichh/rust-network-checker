use axum::{routing, Router};

use crate::api::controllers::options_controller;

pub fn get() -> Router {
    return Router::new()
        .route("/", routing::get(options_controller::get))
        .route("/", routing::post(options_controller::post));
}
