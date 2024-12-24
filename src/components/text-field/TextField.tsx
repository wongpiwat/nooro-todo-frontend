import React from "react";
import { Input, InputProps } from "@nextui-org/react";

type TextFieldType = InputProps;

const TextField = ({ label, placeholder, ...rest }: TextFieldType) => {
  return (
    <Input
      label={label}
      variant="faded"
      labelPlacement="outside"
      placeholder={placeholder}
      classNames={{
        label: ["!text-primary", "!dark:text-primary", "text-sm", "font-bold"],
        inputWrapper: [
          "bg-gray-500",
          "dark:bg-gray-500",
          "hover:bg-gray-600",
          "dark:hover:bg-gray-600",
          "border-gray-400",
          "dark:border-gray-400",
          "group-data-[focus=true]:border-gray-400",
          "dark:group-data-[focus=true]:border-gray-400",
          "group-data-[hover=true]:border-gray-400",
          "dark:group-data-[hover=true]:border-gray-400",
          "rounded-lg",
        ],
      }}
      {...rest}
    />
  );
};

export default TextField;
