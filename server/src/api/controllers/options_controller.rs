use axum::{http::StatusCode, response::Json};
use serde::{Deserialize, Serialize};
use serde_json;

use crate::api::services::options_service;

#[derive(Deserialize, Serialize, Debug)]
pub struct Options {
    pub subnet: Option<String>,
    pub tasks_limit: Option<usize>,
    pub interval: Option<usize>,
}

pub async fn get() -> Result<Json<serde_json::Value>, (StatusCode, String)> {
    let options = options_service::get();
    let response = serde_json::json!({
        "message": "Options retrieved",
        "data": options
    });

    return Ok(Json(response));
}

pub async fn post(
    Json(payload): Json<Options>,
) -> Result<Json<serde_json::Value>, (StatusCode, String)> {
    if payload.subnet.is_none() || payload.tasks_limit.is_none() || payload.interval.is_none() {
        return Err((StatusCode::BAD_REQUEST, "Invalid arguments".to_string()));
    }

    options_service::post(payload);
    let response = serde_json::json!({
        "message": "Options updated"
    });

    return Ok(Json(response));
}
