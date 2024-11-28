use axum::{http::StatusCode, response::Json};
use serde_json::{json, Value};

pub async fn get() -> Result<Json<Value>, (StatusCode, String)> {
    let response = json!({
        "message": "GET method success!"
    });

    return Ok(Json(response));
}

pub async fn post() -> Result<Json<Value>, (StatusCode, String)> {
    let response = json!({
        "message": "POST method success!"
    });

    return Ok(Json(response));
}
