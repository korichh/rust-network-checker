import * as Yup from "yup";

const range_shift = 5;

export interface IOptionsSchema {
  subnet: string;
  range_start: number;
  range_end: number;
  tasks_limit: number;
  interval: number;
}

export const optionsSchema: Yup.ObjectSchema<IOptionsSchema> = Yup.object().shape({
  subnet: Yup.string()
    .matches(
      /^192\.168\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)$/,
      "subnet must be in the format '192.168.x' where x is a number between 0 and 255"
    )
    .required("subnet is required"),
  range_start: Yup.number()
    .typeError("range start is number")
    .min(1, "set range start between 1 and 255")
    .max(255, "set range start between 1 and 255")
    .required("range start is required"),
  range_end: Yup.number()
    .typeError("range end is number")
    .min(1, "set range end between 1 and 255")
    .max(255, "set range end between 1 and 255")
    .required("range end is required")
    .test("range_end", `range end must be greater than range start + ${range_shift}`, (range_end, ctx) => {
      return range_end >= (ctx.parent.range_start || 0) + range_shift;
    }),
  tasks_limit: Yup.number()
    .typeError("tasks limit is number")
    .min(1, "set tasks limit between 1 and 30")
    .max(30, "set tasks limit between 1 and 30")
    .required("tasks limit is required"),
  interval: Yup.number()
    .typeError("interval is number")
    .min(30, "set interval between 30 and 120")
    .max(120, "set interval between 30 and 120")
    .required("interval is required"),
});