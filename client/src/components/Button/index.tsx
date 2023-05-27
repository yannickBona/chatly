import React from "react";
import { StyledButton } from "./styled";

interface ButtonProps {
  text: string;
  onClick: () => void;
}
const Button: React.FC<ButtonProps> = ({ onClick, text }) => {
  return <StyledButton onClick={onClick}>{text}</StyledButton>;
};

export default Button;
