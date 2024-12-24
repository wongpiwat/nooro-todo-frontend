"use client";
import React from "react";
import {
  Button as NextUIButton,
  ButtonProps as NextUIButtonProps,
} from "@nextui-org/react";

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  startComponent?: React.ReactNode;
  endComponent?: React.ReactNode;
  fullWidth?: boolean;
}

type BaseButtonProps = ButtonProps & NextUIButtonProps;

const Button = ({
  children,
  onClick,
  startComponent,
  endComponent,
  ...rest
}: BaseButtonProps) => {
  return (
    <NextUIButton
      className={`hover:bg-blue-700 rounded-lg bg-primary-dark px-4 py-2 text-white`}
      onPress={onClick}
      {...rest}
    >
      {startComponent && startComponent}
      <span className="m-2 font-bold">{children}</span>
      {endComponent && endComponent}
    </NextUIButton>
  );
};

export default Button;
