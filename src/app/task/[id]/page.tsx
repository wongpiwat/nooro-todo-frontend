"use client";

import React, { Usable, use, useState } from "react";
import { useRouter } from "next/navigation";
import { Button as NextUIButton } from "@nextui-org/react";
import { MdAddCircleOutline } from "react-icons/md";
import { MdArrowBack } from "react-icons/md";

import Button from "@/components/button/Button";

import Fade from "@/components/animation/Fade";
import TextField from "@/components/text-field/TextField";
import ColorPicker from "@/components/picker/ColorPicker";
import { MOCK_TASKS, Task } from "@/constants/mock";

export default function Page({ params }: { params: Usable<never> }) {
  const router = useRouter();
  const { id } = use(params);
  console.log("id", id);
  const data = MOCK_TASKS.find((task) => task.id === id) as Task;

  const [title, setTitle] = useState<string>(data.title);
  const [selectedColor, setSelectedColor] = useState<string>(data.color);

  const handleBackToList = () => {
    router.push("/");
  };
  const handleChangeText = (value: string) => {
    setTitle(value);
  };

  const handleUpdateTask = () => {
    console.log("Task Updated!");
  };

  console.log("selectedColor", selectedColor);

  return (
    <Fade id="2" isActive={true}>
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
            value={selectedColor}
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
            onChange={(e) => setSelectedColor(e.target.value)}
            orientation="horizontal"
          />
        </div>

        <Button
          onClick={handleUpdateTask}
          endComponent={<MdAddCircleOutline size={18} />}
        >
          Save
        </Button>
      </div>
    </Fade>
  );
}
