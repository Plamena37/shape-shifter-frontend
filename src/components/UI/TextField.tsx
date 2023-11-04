import { TextField as MuiTextField, TextFieldVariants } from "@mui/material";
import {
  TextFieldInputProps,
  TextFieldLabelProps,
} from "../../utils/common-interfaces";

type TextFieldProps = {
  id: string;
  name: string;
  label: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: boolean;
  helperText?: string | boolean;
  value?: string | number | string[];
  inputRef?: any;
  variant?: TextFieldVariants | undefined;
  required?: boolean;
  type?: string;
  InputLabelProps?: TextFieldLabelProps;
  inputProps?: TextFieldInputProps;
  defaultValue?: string;
  disabled?: boolean;
  placeholder?: string;
};

const TextField = ({
  id,
  name,
  label,
  onChange,
  error,
  helperText,
  value,
  inputRef,
  variant = "standard",
  required = true,
  type,
  InputLabelProps,
  inputProps,
  defaultValue,
  disabled,
  placeholder,
}: TextFieldProps) => {
  return (
    <MuiTextField
      id={id}
      name={name}
      label={label}
      onChange={onChange}
      value={value}
      inputRef={inputRef}
      error={error}
      helperText={helperText}
      variant={variant}
      required={required}
      type={type}
      InputLabelProps={InputLabelProps}
      inputProps={inputProps}
      defaultValue={defaultValue}
      disabled={disabled}
      placeholder={placeholder}
    />
  );
};

export default TextField;
