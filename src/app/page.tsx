"use client";
import { Chip } from "@nextui-org/react";
import { MdAddCircleOutline } from "react-icons/md";
import { MOCK_TASKS } from "@/constants/mock";

import Button from "@/components/button/Button";
import TaskCard from "@/components/card/TaskCard";
import Rocket from "@/components/icon/Rocket";

export default function Home() {
  const handleCreateTask = () => {
    console.log("Create Task");
  };

  const handleSelectTask = (id: string) => {
    console.log(`Selected Task: ${id}`);
  };

  const handleDeleteTask = (id: string) => {
    console.log(`Deleted Task: ${id}`);
  };

  return (
    <div className="flex min-h-screen justify-center pt-16">
      <main className="flex w-1/2 flex-col gap-8">
        <div className="flex items-center justify-center">
          <Rocket />
          <div className="text-2xl font-bold">Todo App</div>
        </div>

        <Button
          onClick={handleCreateTask}
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
      </main>
    </div>
  );
}
