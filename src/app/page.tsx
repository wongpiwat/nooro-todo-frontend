"use client";

import React, { useState } from "react";
import { Button as NextUIButton, Chip } from "@nextui-org/react";
import { MdAddCircleOutline } from "react-icons/md";
import { MdArrowBack } from "react-icons/md";

import { MOCK_TASKS } from "@/constants/mock";

import Button from "@/components/button/Button";
import TaskCard from "@/components/card/TaskCard";
import Rocket from "@/components/icon/Rocket";

import Fade from "@/components/animation/Fade";
import TextField from "@/components/text-field/TextField";
import ColorPicker from "@/components/picker/ColorPicker";

export default function Home() {
  const [tab, setTab] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>("");

  const handleGoToCreateTask = () => {
    setTab(1);
  };

  const handleGoToDetailView = () => {
    setTab(2);
  };

  const handleBackToList = () => {
    setTab(0);
  };

  const handleSelectTask = (id: string) => {
    console.log(`Selected Task: ${id}`);
  };

  const handleDeleteTask = (id: string) => {
    console.log(`Deleted Task: ${id}`);
  };

  const handleChangeText = (value: string) => {
    console.log(value);
  };

  const handleCreateTask = () => {
    console.log("Task Created!");
  };

  console.log("selectedColor", selectedColor);

  return (
    <div className="flex min-h-screen justify-center pt-16">
      <main className="flex w-1/2 flex-col gap-8">
        <div className="flex items-center justify-center">
          <Rocket />
          <div className="text-2xl font-bold">Todo App</div>
        </div>

        {/* Todo list */}
        {tab == 0 && (
          <Fade id="0" isActive={true}>
            <div className="flex flex-col gap-8">
              <Button
                onClick={handleGoToCreateTask}
                endComponent={<MdAddCircleOutline size={18} />}
              >
                Create Task
              </Button>

              <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-1">
                  <div className="text font-bold text-primary-light">Tasks</div>
                  <Chip
                    size="sm"
                    classNames={{
                      base: "bg-gray-400 px-1.5",
                      content: "text-gray-200 font-bold",
                    }}
                  >
                    {MOCK_TASKS.length}
                  </Chip>
                </div>

                <div className="flex flex-row gap-1">
                  <div className="text font-bold text-secondary-light">
                    Completed
                  </div>
                  <Chip
                    size="sm"
                    classNames={{
                      base: "bg-gray-400 px-1.5",
                      content: "text-gray-200 font-bold",
                    }}
                  >
                    {MOCK_TASKS.filter((task) => task.status).length} of{" "}
                    {MOCK_TASKS.length}
                  </Chip>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-2">
                {MOCK_TASKS.length > 0 ? (
                  MOCK_TASKS.map((task) => (
                    <TaskCard
                      key={task.id}
                      id={task.id}
                      title={task.title}
                      status={task.status}
                      onPress={handleGoToDetailView}
                      onSelect={handleSelectTask}
                      onDelete={handleDeleteTask}
                    />
                  ))
                ) : (
                  <>
                    <div className="text font-bold text-gray-300">
                      You don&#39;t have any tasks registered yet.
                    </div>
                    <div className="text font-normal text-gray-300">
                      Create tasks and organize your to-do items.
                    </div>
                  </>
                )}
              </div>
            </div>
          </Fade>
        )}

        {/* New task */}
        {tab == 1 && (
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
                onClick={handleCreateTask}
                endComponent={<MdAddCircleOutline size={18} />}
              >
                Add Task
              </Button>
            </div>
          </Fade>
        )}

        {/* Detail view */}
        {tab == 2 && (
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
                onClick={handleCreateTask}
                endComponent={<MdAddCircleOutline size={18} />}
              >
                Save
              </Button>
            </div>
          </Fade>
        )}
      </main>
    </div>
  );
}
