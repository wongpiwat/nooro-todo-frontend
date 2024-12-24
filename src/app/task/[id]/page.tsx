"use client";

import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button as NextUIButton } from "@nextui-org/react";
import { MdArrowBack } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";

import useFetchTaskById from "@/hooks/useFetchTaskById";
import { updateTask } from "@/services/task.service";
import { DEFAULT_TASKS } from "@/constants/task";
import { Task } from "@/types/Task";

import Button from "@/components/button/Button";
import ColorPicker from "@/components/picker/ColorPicker";
import Fade from "@/components/animation/Fade";
import TextField from "@/components/text-field/TextField";
import Loading from "@/components/loading/Loading";
import ErrorAlert from "@/components/alert/ErrorAlert";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const { task, loading, error } = useFetchTaskById(id);

  useEffect(() => {
    if (task) {
      setForm(task);
    }
  }, [task]);

  const [form, setForm] = useState<Task>(task || DEFAULT_TASKS);

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

  const handleUpdateTask = async () => {
    try {
      console.log("[DEBUG] Updating Task:", form);
      const task = await updateTask(id, form);
      console.log("[DEBUG] Updated Task:", task);
      toast(`Task updated!`, { type: "success" });
    } catch (err) {
      console.error(err);
      toast(`Error updating task!`, { type: "error" });
    } finally {
      // router.push("/");
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  return (
    <Fade id="2" isActive={true}>
      <div className="flex flex-col items-center justify-center pt-8">
        <div className="flex flex-col gap-8">
          <NextUIButton
            isIconOnly
            variant="light"
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
            onClick={handleUpdateTask}
            endComponent={<FaCheck size={16} />}
          >
            Save
          </Button>
        </div>
      </div>
    </Fade>
  );
}
