use axum::http::Method;
use tower::{
    layer::util::{Identity, Stack},
    ServiceBuilder,
};
use tower_http::cors::{Any, CorsLayer};

use crate::config;

pub fn get_cors() -> ServiceBuilder<Stack<CorsLayer, Identity>> {
    let config = config::get();

    return ServiceBuilder::new().layer(
        CorsLayer::new()
            .allow_origin([
                format!("http://{}:{}", config.client_host, config.client_port)
                    .parse()
                    .unwrap(),
            ])
            .allow_methods([Method::GET, Method::POST])
            .allow_headers(Any),
    );
}
