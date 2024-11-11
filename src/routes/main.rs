use axum::{routing::get, Router};

use crate::controllers::main::Controller as MainController;

pub fn router() -> Router {
    return Router::new().route("/", get(MainController::get));
}
