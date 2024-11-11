use dotenv::dotenv;
use std::{env, path::PathBuf};

pub struct Config {
    pub views_path: PathBuf,
    pub host: String,
    pub port: String,
}

pub fn get_config() -> Config {
    dotenv().ok();

    return Config {
        views_path: PathBuf::from("src/views"),
        host: env::var("HOST").unwrap_or("127.0.0.1".to_string()),
        port: env::var("PORT").unwrap_or("5000".to_string()),
    };
}
