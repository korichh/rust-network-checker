import { UpdateOptionsRequestApi, UpdateOptionsResponseApi } from "./apiTypes.server";
import { UpdateOptionsRequest, UpdateOptionsResponse } from "./apiTypes";

export function mapRequest(request: UpdateOptionsRequest): UpdateOptionsRequestApi {
	return request;
}

export function mapResponse(responseApi: UpdateOptionsResponseApi): UpdateOptionsResponse {
	return responseApi;
}
