import { updateOptionsApi } from "./update.api";
import { UpdateOptionsRequest, UpdateOptionsResponse } from "./apiTypes";
import { mapRequest, mapResponse } from "./mappers";
import { GetApiFunc } from "../../base";

export const updateOptions = async (
	getApi: GetApiFunc,
	request: UpdateOptionsRequest,
): Promise<UpdateOptionsResponse> => {
	const api = await getApi();
	const requestApi = mapRequest(request);

	return await updateOptionsApi(api, requestApi).then(mapResponse);
};
