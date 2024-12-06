use std::fs;

use crate::api::controllers::options_controller::Options;

pub fn get() -> Options {
    let json_path = "options.json";
    let json_content = fs::read_to_string(json_path).unwrap();

    return serde_json::from_str::<Options>(&json_content).unwrap();
}

pub fn post(payload: Options) {
    let json_path = "options.json";
    let serialized = serde_json::to_string_pretty(&payload).unwrap();

    fs::write(json_path, serialized).unwrap();
}
