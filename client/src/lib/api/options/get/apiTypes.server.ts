export interface GetOptionsRequestApi { }

export interface GetOptionsResponseApi {
	message: string;
	data: {
		subnet: string;
		tasks_limit: number;
		interval: number;
	}
}
