import { getOptions } from "./get/get";
import { updateOptions } from "./update/update";
import { GetApiFunc, makeEndpoint } from "../base";

export function updateOptionsApi(getApi: GetApiFunc) {
  return {
    getOptions: makeEndpoint(getOptions, getApi),
    updateOptions: makeEndpoint(updateOptions, getApi),
  };
}
