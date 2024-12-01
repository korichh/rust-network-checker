use axum::{routing, Router};

use crate::ws::controllers::main_controller;

pub fn get() -> Router {
    return Router::new().route("/", routing::get(main_controller::get));
}
