"use client";

import React, { Usable, use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, Button as NextUIButton, Spinner } from "@nextui-org/react";
import { MdAddCircleOutline } from "react-icons/md";
import { MdArrowBack } from "react-icons/md";

import useFetchTaskById from "@/hooks/useFetchTaskById";
import { updateTask } from "@/services/task.service";
import { DEFAULT_TASKS } from "@/constants/task";
import { Task } from "@/types/Task";

import Button from "@/components/button/Button";
import ColorPicker from "@/components/picker/ColorPicker";
import Fade from "@/components/animation/Fade";
import TextField from "@/components/text-field/TextField";

export default function Page({ params }: { params: Usable<never> }) {
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
    } catch (err) {
      console.error(err);
    } finally {
      router.push("/");
    }
  };

  if (loading) {
    return <Spinner color="primary" label="Loading..." labelColor="primary" />;
  }

  if (error) {
    return (
      <div>
        <Alert
          color="danger"
          title="Sorry, something went wrong."
          description={error}
        />
      </div>
    );
  }

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
          value={form.title}
          placeholder="Ex. Brush you teeth"
          onValueChange={handleChangeText}
        />

        <div className="flex flex-row">
          <ColorPicker
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
          endComponent={<MdAddCircleOutline size={18} />}
        >
          Save
        </Button>
      </div>
    </Fade>
  );
}
