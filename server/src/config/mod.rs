use dotenv::dotenv;
use std::env;

pub struct Config {
    pub api_host: String,
    pub api_port: String,
}

pub fn get() -> Config {
    dotenv().ok();

    return Config {
        api_host: env::var("API_HOST").unwrap_or("127.0.0.1".to_string()),
        api_port: env::var("API_PORT").unwrap_or("5000".to_string()),
    };
}
