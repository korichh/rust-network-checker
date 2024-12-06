import { GetOptionsRequestApi, GetOptionsResponseApi } from "./apiTypes.server";
import { GetOptionsRequest, GetOptionsResponse } from "./apiTypes";

export function mapRequest(request: GetOptionsRequest): GetOptionsRequestApi {
	return request;
}

export function mapResponse(responseApi: GetOptionsResponseApi): GetOptionsResponse {
	return responseApi;
}
