import { useState } from "react";
import { FormikHelpers } from "formik";
import { Api } from "../../lib/api";
import { useOptionsStore } from "../../lib/store";
import { IOptionsSchema, optionsSchema } from "../../lib/validation";
import Form from "../Form";
import InputField from "../inputs/InputField";

export default function OptionsForm() {
  const options = useOptionsStore((store) => store.options);
  const setOptions = useOptionsStore((store) => store.setOptions);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!options) return null;

  const initialValues: IOptionsSchema = options;

  async function handleSubmit(
    values: IOptionsSchema,
    _: FormikHelpers<IOptionsSchema>
  ) {
    try {
      if (!isSubmitted) {
        await Api.updateOptions(values);
        setOptions(values);

        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 1500);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Form<IOptionsSchema>
      initialValues={initialValues}
      validationSchema={optionsSchema}
      onSubmit={handleSubmit}
    >
      <div className={`text-success bg-white px-4 py-3 border-l-4 border-success mb-4 ${isSubmitted ? "" : "hidden"}`}>Options Updated!</div>
      <InputField name="subnet" type="text" placeholder="192.168.x" label="Enter subnet" />
      <InputField name="tasks_limit" type="number" placeholder="25" label="Enter tasks limit" />
      <InputField name="interval" type="number" placeholder="30" label="Enter interval" />
      <InputField name="submit" type="submit" placeholder="Submit" />
    </Form>
  )
}