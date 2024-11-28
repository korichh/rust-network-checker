use axum::{http::StatusCode, response::Json};
use serde_json::{json, Value};

pub struct Controller {}

impl Controller {
    pub async fn get() -> Result<Json<Value>, (StatusCode, String)> {
        let response = json!({
            "message": "Success!"
        });

        return Ok(Json(response));
    }
}
