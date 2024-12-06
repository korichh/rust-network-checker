import { AxiosInstance, AxiosResponse } from "axios";
import { UpdateOptionsRequestApi, UpdateOptionsResponseApi } from "./apiTypes.server";

export const updateOptionsApi = async (
	api: AxiosInstance,
	requestApi: UpdateOptionsRequestApi,
): Promise<UpdateOptionsResponseApi> => {
	const { data } = await api.request<
		UpdateOptionsResponseApi,
		AxiosResponse<UpdateOptionsResponseApi>
	>({
		method: "post",
		url: "/options",
		data: requestApi,
	});

	return data;
};
