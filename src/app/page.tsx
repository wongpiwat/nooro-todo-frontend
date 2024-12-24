"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, Chip, Spinner } from "@nextui-org/react";
import { MdAddCircleOutline } from "react-icons/md";

import useFetchTasks from "@/hooks/useFetchTasks";
import { deleteTask, updateTask } from "@/services/task.service";

import ConfirmationModal from "@/components/modal/ConfirmationModal";
import Button from "@/components/button/Button";
import Fade from "@/components/animation/Fade";
import TaskCard from "@/components/card/TaskCard";

export default function Home() {
  const router = useRouter();
  const { tasks, loading, error, refresh } = useFetchTasks();

  const [deleteItemId, setDeleteItemId] = useState<string>("");

  const handleGoToCreateTask = () => {
    router.push(`/create`);
  };

  const handleGoToDetailView = (id: string) => {
    router.push(`/task/${id}`);
  };

  const handleSelectTask = async (id: string) => {
    console.log(`[DEBUG] Selected Task: ${id}`);
    await handleChangeStatus(id);
  };

  const handleSelectDeleteTask = (id: string) => {
    console.log(`[DEBUG] Deleted Task: ${id}`);
    setDeleteItemId(id);
  };

  const handleDeselectDeleteTask = () => {
    setDeleteItemId("");
  };

  const handleChangeStatus = async (id: string) => {
    try {
      const task = tasks.find((task) => task.id === id);
      if (!task) {
        throw new Error(`[ERROR] Task not found: ${id}`);
      }

      console.log(`[DEBUG] Changing Status: ${id} - ${task?.status}`);
      const newTask = { ...task, status: !task.status };
      const data = await updateTask(id, newTask);
      console.log(`[DEBUG] Changed Status: ${data.id} - ${data.status}`);
    } catch (err) {
      console.error(err);
    } finally {
      refresh();
    }
  };

  const handleDeleteTask = async () => {
    try {
      console.log(`[DEBUG] Deleting Task: ${deleteItemId}`);
      const data = await deleteTask(deleteItemId);
      console.log(`[DEBUG] Deleted Task: ${data.id}`);
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteItemId("");
      refresh();
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
              {tasks.length}
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
              {tasks.filter((task) => task.status).length} of {tasks.length}
            </Chip>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                color={task.color}
                status={task.status}
                onPress={() => handleGoToDetailView(task.id)}
                onSelect={handleSelectTask}
                onDelete={handleSelectDeleteTask}
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
      <ConfirmationModal
        isOpen={!!deleteItemId}
        Title={`Delete Task Id: ${deleteItemId}`}
        description="Are you sure you want to delete this task?"
        leftLabel="Cancel"
        rightLabel="Delete"
        onPress={() => handleDeleteTask()}
        onClose={() => handleDeselectDeleteTask()}
      />
    </Fade>
  );
}
