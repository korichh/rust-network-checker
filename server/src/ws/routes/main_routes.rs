use axum::{routing, Router};

use crate::ws::handlers::main_handler;

pub fn get() -> Router {
    return Router::new().route("/", routing::get(main_handler::get));
}
