use axum::{http::StatusCode, response::Html};
use std::fs::read_to_string;

use crate::config::main::get_config;

pub struct Controller {}

impl Controller {
    pub async fn get() -> Result<Html<String>, (StatusCode, String)> {
        let config = get_config();

        let file_path = config.views_path.join("index.html");
        let file = read_to_string(file_path)
            .map_err(|err| (StatusCode::INTERNAL_SERVER_ERROR, err.to_string()))?;

        return Ok(Html(file));
    }
}
