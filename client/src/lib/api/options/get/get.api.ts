import { AxiosInstance, AxiosResponse } from "axios";
import { GetOptionsRequestApi, GetOptionsResponseApi } from "./apiTypes.server";

export const getOptionsApi = async (
	api: AxiosInstance,
	requestApi: GetOptionsRequestApi,
): Promise<GetOptionsResponseApi> => {
	const { data } = await api.request<
		GetOptionsResponseApi,
		AxiosResponse<GetOptionsResponseApi>
	>({
		method: "get",
		url: "/options",
		data: requestApi,
	});

	return data;
};
