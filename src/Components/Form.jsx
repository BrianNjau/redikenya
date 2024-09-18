import React, { memo } from "react";
import { Input as AntInput } from "antd";
// Libraries
import { useField } from "formik";

export const Input = memo(
  ({ label, labelClass, className, showErrorMsg, ...props }) => {
    const [field, meta] = useField(props);

    return (
      <label
        className={`block relative ${
          meta.touched && meta.error ? " errors-danger" : ""
        }${labelClass ? ` ${labelClass}` : ""}`}
      >
        {label}
        <AntInput
          className={`${className}${
            meta.touched && meta.error ? " errors-danger" : ""
          }`}
          {...field}
          {...props}
        />
        {meta.touched && meta.error && showErrorMsg ? (
          <span className="text-xs text-error block m-1">{meta.error}</span>
        ) : null}
      </label>
    );
  }
);
export const Password = memo(
  ({ label, labelClass, className, showErrorMsg, ...props }) => {
    const [field, meta] = useField(props);

    return (
      <label
        className={`block relative ${
          meta.touched && meta.error ? " errors-danger" : ""
        }${labelClass ? ` ${labelClass}` : ""}`}
      >
        {label}
        <AntInput.Password
          className={`${className}${
            meta.touched && meta.error ? " errors-danger" : ""
          }`}
          {...field}
          {...props}
        />
        {meta.touched && meta.error && showErrorMsg ? (
          <span className="text-xs text-error block m-1">{meta.error}</span>
        ) : null}
      </label>
    );
  }
);

export const TextArea = memo(
  ({ label, labelClass, className, showErrorMsg, ...props }) => {
    const [field, meta] = useField(props);

    return (
      <label
        className={`block relative${
          meta.touched && meta.error ? " errors-danger" : ""
        }${labelClass ? ` ${labelClass}` : ""}`}
      >
        {label}
        <textarea
          className={`${className}${
            meta.touched && meta.error ? " errors-danger" : ""
          }`}
          {...field}
          {...props}
        />
        {meta.touched && meta.error && showErrorMsg ? (
          <span className="text-xs text-error block mt-[1px]">
            {meta.error}
          </span>
        ) : null}
      </label>
    );
  }
);

export const Checkbox = memo(
  ({ label, labelClass, className, children, ...props }) => {
    const [field, meta] = useField(props);

    return (
      <label
        className={`block relative${
          meta.touched && meta.error ? " errors-danger" : ""
        }${labelClass ? ` ${labelClass}` : ""}`}
      >
        <input
          type="checkbox"
          className={`${className}${
            meta.touched && meta.error ? " errors-danger" : ""
          }`}
          {...field}
          {...props}
        />
        {children}
      </label>
    );
  }
);

Input.defaultProps = {
  showErrorMsg: true,
};
