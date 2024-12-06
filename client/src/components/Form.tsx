import { Formik, Form as FormikForm, FormikHelpers, FormikValues } from "formik";
import { Schema } from "yup";

type TOnSubmit<T> = (
  values: T & FormikValues,
  formikHelpers: FormikHelpers<T & FormikValues>
) => void | Promise<void>;

interface FormProps<T> {
  children: React.ReactNode;
  initialValues: T & FormikValues;
  validationSchema: Schema<T>;
  onSubmit: TOnSubmit<T>;
}

export default function Form<T>({
  children,
  initialValues,
  validationSchema,
  onSubmit,
}: FormProps<T>) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <FormikForm>
        {children}
      </FormikForm>
    </Formik>
  );
}