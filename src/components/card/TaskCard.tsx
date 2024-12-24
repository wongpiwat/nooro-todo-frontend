"use client";

import React from "react";
import { Button, Card, CardBody, Checkbox, cn } from "@nextui-org/react";
import { HiOutlineTrash } from "react-icons/hi2";
import { PressEvent } from "@react-types/shared";

interface TaskCardProps {
  id: string;
  title: string;
  color: string;
  status: boolean;
  onPress: (e: PressEvent) => void;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskCard = ({
  id,
  title,
  color,
  status,
  onPress,
  onSelect,
  onDelete,
}: TaskCardProps) => {
  const getColor = (color: string) => {
    switch (color) {
      case "red":
        return "group-data-[selected=true]:after:bg-red before:border-red";
      case "orange":
        return "group-data-[selected=true]:after:bg-orange before:border-orange";
      case "yellow":
        return "group-data-[selected=true]:after:bg-yellow before:border-yellow";
      case "green":
        return "group-data-[selected=true]:after:bg-green before:border-green";
      case "blue":
        return "group-data-[selected=true]:after:bg-blue before:border-blue";
      case "purple":
        return "group-data-[selected=true]:after:bg-purple before:border-purple";
      case "pink":
        return "group-data-[selected=true]:after:bg-pink before:border-pink";
      case "brown":
        return "group-data-[selected=true]:after:bg-brown before:border-brown";
      default:
        return "group-data-[selected=true]:after:bg-gray before:border-gray";
    }
  };

  const colorStyle = getColor(color);
  const titleStyle = status ? "line-through text-gray-300" : "text-gray-100";

  return (
    <Card
      isPressable
      className="flex w-full border-1 border-gray-400 bg-gray-500 hover:bg-opacity-50"
      onPress={onPress}
    >
      <CardBody className="flex flex-row">
        {/* Radio Button */}
        <div>
          <Checkbox
            classNames={{
              wrapper: cn(
                "bg-transparent",
                "text-white",
                "group-data-[hover=true]:before:bg-opacity-20",
                "group-data-[hover=true]:after:bg-opacity-50",
                colorStyle,
              ),
            }}
            // color="primary"
            isSelected={status}
            radius="full"
            aria-label="Select task"
            onValueChange={() => onSelect(id)}
          />
        </div>

        {/* Title */}
        <div className="flex-grow">
          <p className={`text-sm leading-relaxed ${titleStyle}`}>{title}</p>
        </div>

        {/* Delete Icon */}
        <Button
          isIconOnly
          variant="light"
          className={cn("bg-transparent", "text-gray-300", "hover:text-white")}
          onPress={() => onDelete(id)}
          aria-label="Delete task"
        >
          <HiOutlineTrash size={18} />
        </Button>
      </CardBody>
    </Card>
  );
};

export default TaskCard;
