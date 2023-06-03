import React, { ComponentProps } from "react";
import { StyledContainer } from "./styled";

interface ButtonProps extends React.ComponentProps<"button"> {
  text: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ onClick, text, ...restProps }) => {
  return (
    <StyledContainer>
      <button onClick={onClick} {...restProps}>
        {text}
      </button>
    </StyledContainer>
  );
};

export default Button;
