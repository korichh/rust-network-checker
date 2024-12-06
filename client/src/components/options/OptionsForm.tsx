import { useState, useEffect } from "react";
import { FormikHelpers } from "formik";
import { IOptionsSchema, optionsSchema } from "../../lib/validation";
import { Api } from "../../lib/api";
import Form from "../Form";
import InputField from "../inputs/InputField";

export default function OptionsForm() {
  const [initialValues, setInitialValues] = useState<IOptionsSchema>({
    subnet: "192.168.0",
    tasks_limit: 1,
    interval: 30,
  });

  useEffect(() => {
    (async () => {
      const options = await Api.getOptions({});

      console.log(options);
    })();
  }, []);

  async function handleSubmit(
    values: IOptionsSchema,
    actions: FormikHelpers<IOptionsSchema>
  ) {
    try {
      setInitialValues(values);
      actions.resetForm();

      console.log(values);
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
      <InputField name="subnet" type="text" placeholder="192.168.x" label="Enter subnet" />
      <InputField name="tasks_limit" type="number" placeholder="25" label="Enter tasks limit" />
      <InputField name="interval" type="number" placeholder="30" label="Enter interval" />
      <InputField name="submit" type="submit" placeholder="Submit" />
    </Form>
  )
}