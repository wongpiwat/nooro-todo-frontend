"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button as NextUIButton } from "@nextui-org/react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdAddCircleOutline } from "react-icons/md";
import { MdArrowBack } from "react-icons/md";
import { toast } from "react-toastify";

import { createTask } from "@/services/task.service";
import { schema } from "@/schemas/task.schema";
import { DEFAULT_TASKS, TASK_COLORS } from "@/constants/task";
import { Task } from "@/types/Task";

import Button from "@/components/button/Button";
import ColorPicker from "@/components/picker/ColorPicker";
import Fade from "@/components/animation/Fade";
import TextField from "@/components/text-field/TextField";

export default function Page() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    // watch,
    reset,
    formState: { errors },
  } = useForm<Task>({
    defaultValues: DEFAULT_TASKS,
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Task> = async (data) => {
    try {
      console.log("[DEBUG] Creating Task:", data);
      const createdTask = await createTask(data);
      console.log("[DEBUG] Created Task:", createdTask);
      toast(`Task created!`, { type: "success" });
    } catch (err) {
      console.error(err);
      toast(`Error creating task!`, { type: "error" });
    } finally {
      // clear form after submit
      reset();

      // redirect to home page
      router.push("/");
    }
  };

  const handleBackToList = () => {
    router.push("/");
  };

  // console.log("[DEBUG] watch:", JSON.stringify(watch(), null, 2));
  // console.log("[DEBUG] errors:", errors);

  return (
    <Fade id="create" isActive={true}>
      <div className="flex flex-col items-center justify-center">
        <div className="flex w-full max-w-screen-sm flex-col px-4 pt-8">
          <form onSubmit={handleSubmit(onSubmit)}>
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

              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="lg"
                    label="Title"
                    name={field.name}
                    value={field.value}
                    placeholder="Ex. Brush you teeth"
                    isInvalid={Boolean(errors.title)}
                    errorMessage={errors.title?.message}
                    onValueChange={(value) => field.onChange(value)}
                  />
                )}
              />

              <div className="flex flex-row">
                <Controller
                  name="color"
                  control={control}
                  render={({ field }) => (
                    <ColorPicker
                      {...field}
                      label="Color"
                      name={field.name}
                      value={field.value}
                      isInvalid={Boolean(errors.color)}
                      errorMessage={errors.color?.message}
                      items={TASK_COLORS}
                      onChange={(e) => field.onChange(e.target.value)}
                      orientation="horizontal"
                    />
                  )}
                />
              </div>

              <Button
                type="submit"
                endComponent={<MdAddCircleOutline size={18} />}
              >
                Add Task
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Fade>
  );
}
