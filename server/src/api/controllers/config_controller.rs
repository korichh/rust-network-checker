use axum::{http::StatusCode, response::Json};
use serde::{Deserialize, Serialize};
use serde_json;
use std::fs;

#[derive(Deserialize, Serialize, Debug)]
pub struct Options {
    pub subnet: String,
    pub tasks_limit: usize,
}

pub async fn get() -> Result<Json<serde_json::Value>, (StatusCode, String)> {
    let json_path = "options.json";

    let json_content = fs::read_to_string(json_path).unwrap();
    let options = serde_json::from_str::<Options>(&json_content).unwrap();
    let response = serde_json::json!(options);

    return Ok(Json(response));
}

pub async fn post() -> Result<Json<serde_json::Value>, (StatusCode, String)> {
    let response = serde_json::json!({
        "message": "POST method success!"
    });

    return Ok(Json(response));
}
