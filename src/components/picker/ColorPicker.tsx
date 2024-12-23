"use client";

import React, { ChangeEventHandler } from "react";
import { Radio, RadioGroup, RadioGroupProps, cn } from "@nextui-org/react";

interface EllipseProps {
  color: string;
  value: string;
}

export const Ellipse = ({ color, value }: EllipseProps) => {
  const getColor = (color: string) => {
    switch (color) {
      case "red":
        return "bg-red";
      case "orange":
        return "bg-orange";
      case "yellow":
        return "bg-yellow";
      case "green":
        return "bg-green";
      case "blue":
        return "bg-blue";
      case "purple":
        return "bg-purple";
      case "pink":
        return "bg-pink";
      case "brown":
        return "bg-brown";
      default:
        return "bg-gray";
    }
  };

  const colorStyle = getColor(color);

  return (
    <Radio
      aria-label={value}
      value={value}
      classNames={{
        base: cn(
          "h-11 m-0",
          colorStyle,
          "hover:bg-opacity-80",
          "cursor-pointer rounded-full p-4 border-2 border-transparent",
          "data-[selected=true]:border-white",
        ),
        wrapper: "hidden", // hide the radio button
      }}
    />
  );
};

interface ColorPickerProps {
  label?: string;
  value: string;
  items: { value: string; color: string }[];
  onChange: ChangeEventHandler<HTMLInputElement>;
}

type ColorPickerType = ColorPickerProps & RadioGroupProps;

const ColorPicker = ({
  label,
  value,
  items,
  onChange,
  ...rest
}: ColorPickerType) => {
  return (
    <RadioGroup label={label} value={value} onChange={onChange} {...rest}>
      {items.map((item) => (
        <Ellipse key={item.value} color={item.color} value={item.value} />
      ))}
    </RadioGroup>
  );
};

export default ColorPicker;
