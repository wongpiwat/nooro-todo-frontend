"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button as NextUIButton } from "@nextui-org/react";
import { MdAddCircleOutline } from "react-icons/md";
import { MdArrowBack } from "react-icons/md";

import { createTask } from "@/services/task.service";
import { DEFAULT_TASKS } from "@/constants/task";
import { Task } from "@/types/Task";

import Button from "@/components/button/Button";
import ColorPicker from "@/components/picker/ColorPicker";
import Fade from "@/components/animation/Fade";
import TextField from "@/components/text-field/TextField";

export default function Page() {
  const router = useRouter();
  const [form, setForm] = useState<Task>(DEFAULT_TASKS);

  const handleBackToList = () => {
    router.push("/");
  };
  const handleChangeText = (value: string) => {
    if (value) {
      setForm((prev) => ({ ...prev, title: value }));
    }
  };

  const handleChangeColor = (value: string) => {
    if (value) {
      setForm((prev) => ({ ...prev, color: value }));
    }
  };

  const handleCreateTask = async () => {
    try {
      console.log("[DEBUG] Creating Task:", form);
      const createdTask = await createTask(form);
      console.log("[DEBUG] Created Task:", createdTask);
    } catch (err) {
      console.error(err);
    } finally {
      router.push("/");
    }
  };

  return (
    <Fade id="1" isActive={true}>
      <div className="flex flex-col items-center justify-center pt-8">
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
            value={form.title}
            placeholder="Ex. Brush you teeth"
            onValueChange={handleChangeText}
          />

          <div className="flex flex-row">
            <ColorPicker
              label="Color"
              value={form.color}
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
      </div>
    </Fade>
  );
}
