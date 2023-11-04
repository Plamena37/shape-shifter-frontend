import { Button as MuiButton } from "@mui/material";
import "../../assets/global.scss";

type ButtonProps = {
  children: React.ReactNode;
  btnStyle?: string;
  btnDisabled?: boolean;
  btnType?: "button" | "submit" | "reset";
  btnVariant?: "contained" | "text" | "outlined";
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
};

const Button = ({
  children,
  btnStyle,
  btnDisabled,
  btnType,
  btnVariant = "contained",
  color,
  size,
  onClick,
}: ButtonProps) => {
  return (
    <MuiButton
      variant={btnVariant}
      className={`btn ${btnStyle}`}
      disabled={btnDisabled}
      type={btnType}
      color={color}
      size={size}
      onClick={onClick}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
