import { Field, ErrorMessage } from "formik";

interface InputFieldProps {
  name: string;
  type: string;
  placeholder?: string;
  label?: string;
}

export default function InputField({
  name,
  type,
  placeholder = "",
  label = "",
}: InputFieldProps) {
  return (
    <div className="mb-4 w-full">
      {label && (
        <label htmlFor={name} className="block font-medium mb-2">
          {label}
        </label>
      )}
      {type === "submit" ? (
        <button
          type={type}
          className={`w-full h-[40px] px-3 bg-secondary-main text-white hover:opacity-80 rounded-lg transition-all`}
        >
          {placeholder}
        </button>
      ) : (
        <Field
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          className={`w-full h-[40px] px-3 bg-transparent text-primary border border-secondary hover:border-primary rounded-lg transition-all`}
        />
      )}
      <ErrorMessage
        name={name}
        component="div"
        className="text-error text-xs mt-1"
      />
    </div>
  );
}
