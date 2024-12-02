use axum::{http::StatusCode, response::Json};
use serde::{Deserialize, Serialize};
use serde_json;

use crate::api::services::config_service;

#[derive(Deserialize, Serialize, Debug)]
pub struct Options {
    pub subnet: Option<String>,
    pub tasks_limit: Option<usize>,
}

pub async fn get() -> Result<Json<serde_json::Value>, (StatusCode, String)> {
    let options = config_service::get();
    let response = serde_json::json!({
        "data": options,
        "message": "Options retrieved"
    });

    return Ok(Json(response));
}

pub async fn post(
    Json(payload): Json<Options>,
) -> Result<Json<serde_json::Value>, (StatusCode, String)> {
    if payload.subnet.is_none() || payload.tasks_limit.is_none() {
        return Err((StatusCode::BAD_REQUEST, "Invalid arguments".to_string()));
    }

    config_service::post(payload);
    let response = serde_json::json!({
        "message": "Options updated"
    });

    return Ok(Json(response));
}
