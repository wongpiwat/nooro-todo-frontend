"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Chip } from "@nextui-org/react";
import { MdAddCircleOutline } from "react-icons/md";

import { MOCK_TASKS } from "@/constants/mock";

import Button from "@/components/button/Button";
import TaskCard from "@/components/card/TaskCard";

import Fade from "@/components/animation/Fade";

export default function Home() {
  const router = useRouter();

  const handleGoToCreateTask = () => {
    router.push(`/create`);
  };

  const handleGoToDetailView = (id: string) => {
    router.push(`/task/${id}`);
  };

  const handleSelectTask = (id: string) => {
    console.log(`Selected Task: ${id}`);
  };

  const handleDeleteTask = (id: string) => {
    console.log(`Deleted Task: ${id}`);
  };

  return (
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
            <div className="text font-bold text-secondary-light">Completed</div>
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
                onPress={() => handleGoToDetailView(task.id)}
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
  );
}
