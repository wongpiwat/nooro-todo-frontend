"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button as NextUIButton } from "@nextui-org/react";
import { MdAddCircleOutline } from "react-icons/md";
import { MdArrowBack } from "react-icons/md";

import Button from "@/components/button/Button";

import Fade from "@/components/animation/Fade";
import TextField from "@/components/text-field/TextField";
import ColorPicker from "@/components/picker/ColorPicker";

export default function Page() {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [color, setColor] = useState<string>("");

  const handleBackToList = () => {
    router.push("/");
  };
  const handleChangeText = (value: string) => {
    setTitle(value);
  };

  const handleChangeColor = (value: string) => {
    setColor(value);
  };

  const handleCreateTask = () => {
    console.log("Task Updated!");
  };

  console.log("color", color);

  return (
    <Fade id="1" isActive={true}>
      <div className="flex flex-col gap-8">
        <NextUIButton
          isIconOnly
          className="bg-transparent text-white"
          onPress={handleBackToList}
          aria-label="Back"
        >
          <MdArrowBack size={18} />
        </NextUIButton>

        <TextField
          label="Title"
          value={title}
          placeholder="Ex. Brush you teeth"
          onValueChange={handleChangeText}
        />

        <div className="flex flex-row">
          <ColorPicker
            value={color}
            items={[
              { value: "red", color: "red" },
              { value: "orange", color: "orange" },
              { value: "yellow", color: "yellow" },
              { value: "green", color: "green" },
              { value: "blue", color: "blue" },
              { value: "purple", color: "purple" },
              { value: "pink", color: "pink" },
              { value: "brown", color: "brown" },
            ]}
            onChange={(e) => handleChangeColor(e.target.value)}
            orientation="horizontal"
          />
        </div>

        <Button
          onClick={handleCreateTask}
          endComponent={<MdAddCircleOutline size={18} />}
        >
          Add Task
        </Button>
      </div>
    </Fade>
  );
}
