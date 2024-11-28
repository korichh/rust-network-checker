use axum::{routing, Router};

use crate::api::controllers::config_controller;

pub fn get() -> Router {
    return Router::new()
        .route("/", routing::get(config_controller::get))
        .route("/", routing::post(config_controller::post));
}
