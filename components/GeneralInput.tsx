import React, {
  FC,
  HTMLAttributes,
  HtmlHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";

type InputType = "text" | "select" | "multiLineText" | "button" | "custom";
// type PropTypes = {
//   inputType: InputType;
//   renderInput: () => ReactNode;
// };
type PropTypes =
  | {
      value: string;
      inputProps: InputHTMLAttributes<HTMLInputElement>;
      label?: string;
      inputType: Exclude<InputType, "custom" | "multiLineText">;
      renderInput?: () => React.ReactNode;
    }
  | {
      value: string;
      inputProps: TextareaHTMLAttributes<HTMLTextAreaElement>;
      label?: string;
      inputType: "multiLineText";
      renderInput?: () => React.ReactNode;
    }
  | {
      inputProps?: never;
      label?: string;
      inputType: "custom";
      renderInput: () => React.ReactNode;
    };

const GeneralInput: FC<PropTypes> = function GeneralInput({
  inputType,
  renderInput,
  label,
  inputProps,
  value,
}) {
  return (
    <div>
      {label && (
        <label className="block   dark:text-white text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
      )}
      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
        {(inputType === "text" && (
          <input
            value={value}
            {...inputProps}
            className="block dark:bg-gray-800 dark:text-white dark:ring-gray-800 dark:focus:ring-gray-800 w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        )) ||
          (inputType === "multiLineText" && (
            <textarea
              value={value}
              {...inputProps}
              className="block dark:bg-gray-800 dark:focus:ring-gray-800 dark:text-white w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset dark:ring-gray-800 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
          )) ||
          (inputType === "custom" && (renderInput ? renderInput() : null))}
      </div>
    </div>
  );
};

export default GeneralInput;
