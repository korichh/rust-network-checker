import { createAxiosInstance, GetApiFunc } from "./base";
import { updateOptionsApi } from "./options";


function createApi(getAxiosInstance: GetApiFunc) {
  return {
    ...updateOptionsApi(getAxiosInstance),
  };
}

export const Api = createApi(async () => {
  const baseURL = "http://127.0.0.1:5000/api"

  return createAxiosInstance({ baseURL });
});
