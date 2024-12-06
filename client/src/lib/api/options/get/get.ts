import { getOptionsApi } from "./get.api";
import { GetOptionsRequest, GetOptionsResponse } from "./apiTypes";
import { mapRequest, mapResponse } from "./mappers";
import { GetApiFunc } from "../../base";

export const getOptions = async (
	getApi: GetApiFunc,
	request: GetOptionsRequest,
): Promise<GetOptionsResponse> => {
	const api = await getApi();
	const requestApi = mapRequest(request);

	return await getOptionsApi(api, requestApi).then(mapResponse);
};
