"use client";
import React from "react";
import { Button, Card, CardBody, Checkbox } from "@nextui-org/react";
import { HiOutlineTrash } from "react-icons/hi2";

interface TaskCardProps {
  id: string;
  title: string;
  status: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskCard = ({ id, title, status, onSelect, onDelete }: TaskCardProps) => {
  return (
    <Card className="border-1 border-gray-400 bg-gray-500">
      <CardBody className="flex flex-row">
        {/* Radio Button */}
        <div>
          <Checkbox
            checked={status}
            color="primary"
            radius="full"
            aria-label="Select task"
            onClick={() => onSelect(id)}
          />
        </div>

        {/* Title */}
        <div className="flex-grow">
          <p className="text-sm leading-relaxed">{title}</p>
        </div>

        {/* Delete Icon */}
        <Button
          isIconOnly
          className="bg-transparent text-gray-300"
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
