export interface GetOptionsRequestApi { }

export interface GetOptionsResponseApi {
	subnet: string;
	range_start: number;
	range_end: number;
	tasks_limit: number;
	interval: number;
}
