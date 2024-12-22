import React from "react";

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  startComponent?: React.ReactNode;
  endComponent?: React.ReactNode;
  fullWidth?: boolean;
}

type BaseButtonAttributes = ButtonProps &
  React.ComponentPropsWithoutRef<"button">;

const Button = ({
  children,
  onClick,
  startComponent,
  endComponent,
}: BaseButtonAttributes) => {
  return (
    <button
      className={`bg-primary-dark rounded-lg px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
      onClick={onClick}
    >
      {startComponent && startComponent}
      <span className="m-2 font-bold">{children}</span>
      {endComponent && endComponent}
    </button>
  );
};

export default Button;
