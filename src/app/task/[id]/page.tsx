"use client";

import React, { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button as NextUIButton } from "@nextui-org/react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdArrowBack } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";

import useFetchTaskById from "@/hooks/useFetchTaskById";
import { updateTask } from "@/services/task.service";
import { schema } from "@/schemas/task.schema";
import { DEFAULT_TASKS, TASK_COLORS } from "@/constants/task";
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

  const {
    control,
    handleSubmit,
    setValue,
    // watch,
    reset,
    formState: { errors },
  } = useForm<Task>({
    defaultValues: DEFAULT_TASKS,
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (task) {
      setValue("id", task.id);
      setValue("title", task.title);
      setValue("color", task.color);
      setValue("status", task.status);
      setValue("timestamps", new Date(task.timestamps));
    }
  }, [task, setValue]);

  const onSubmit: SubmitHandler<Task> = async (data) => {
    try {
      console.log("[DEBUG] Updating Task:", data);
      const task = await updateTask(id, data);
      console.log("[DEBUG] Updated Task:", task);
      toast(`Task updated!`, { type: "success" });
    } catch (err) {
      console.error(err);
      toast(`Error updating task!`, { type: "error" });
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

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  // console.log("[DEBUG] watch:", JSON.stringify(watch(), null, 2));
  // console.log("[DEBUG] errors:", errors);

  return (
    <Fade id="edit" isActive={true}>
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

              <Button type="submit" endComponent={<FaCheck size={16} />}>
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Fade>
  );
}
