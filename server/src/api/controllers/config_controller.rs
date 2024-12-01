use axum::{http::StatusCode, response::Json};
use serde::{Deserialize, Serialize};
use serde_json;
use std::fs;

#[derive(Deserialize, Serialize, Debug)]
pub struct Options {
    pub subnet: Option<String>,
    pub tasks_limit: Option<usize>,
}

pub async fn get() -> Result<Json<serde_json::Value>, (StatusCode, String)> {
    let json_path = "options.json";

    let json_content = fs::read_to_string(json_path).unwrap();
    let options = serde_json::from_str::<Options>(&json_content).unwrap();
    let response = serde_json::json!({
        "data": options,
        "message": "Options retrieved"
    });

    return Ok(Json(response));
}

pub async fn post(
    Json(payload): Json<Options>,
) -> Result<Json<serde_json::Value>, (StatusCode, String)> {
    let json_path = "options.json";

    if payload.subnet.is_none() || payload.tasks_limit.is_none() {
        return Err((StatusCode::BAD_REQUEST, "Invalid arguments".to_string()));
    }

    let serialized = serde_json::to_string_pretty(&payload).unwrap();
    fs::write(json_path, serialized).unwrap();
    let response = serde_json::json!({
        "message": "Options updated"
    });

    return Ok(Json(response));
}
