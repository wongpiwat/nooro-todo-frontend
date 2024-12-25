"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Chip } from "@nextui-org/react";
import { MdAddCircleOutline } from "react-icons/md";
import { LuNotepadText } from "react-icons/lu";
import { ToastContainer, toast } from "react-toastify";

import useFetchTasks from "@/hooks/useFetchTasks";
import { deleteTask, updateTask } from "@/services/task.service";

import ConfirmationModal from "@/components/modal/ConfirmationModal";
import Button from "@/components/button/Button";
import Fade from "@/components/animation/Fade";
import TaskCard from "@/components/card/TaskCard";
import Loading from "@/components/loading/Loading";
import ErrorAlert from "@/components/alert/ErrorAlert";

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

  const handleSelectTask = (id: string) => {
    handleChangeStatus(id);
  };

  const handleSelectDeleteTask = (id: string) => {
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
      toast(`Task ${data.status ? "completed" : "incompleted"}!`, {
        type: data.status ? "info" : "warning",
      });
    } catch (err) {
      console.error(err);
      toast(`Error changing task status!`, { type: "error" });
    } finally {
      refresh();
    }
  };

  const handleDeleteTask = async () => {
    try {
      console.log(`[DEBUG] Deleting Task: ${deleteItemId}`);
      const data = await deleteTask(deleteItemId);
      console.log(`[DEBUG] Deleted Task: ${data.id}`);
      toast(`Task deleted!`, { type: "success" });
    } catch (err) {
      console.error(err);
      toast(`Error deleting task!`, { type: "error" });
    } finally {
      setDeleteItemId("");
      refresh();
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  return (
    <Fade id="list" isActive={true}>
      <div className="sticky top-0 z-10 h-5 bg-gray-700"></div>
      <div className="-mt-5 flex flex-col items-center justify-center gap-8 bg-gray-600 px-4">
        <div className="flex w-full max-w-screen-sm flex-col gap-4">
          <div className="sticky top-0 z-20 flex flex-col gap-16 border-gray-600 bg-gray-600 pb-2">
            <div className="flex flex-col">
              <Button
                onClick={handleGoToCreateTask}
                endComponent={<MdAddCircleOutline size={18} />}
              >
                Create Task
              </Button>
            </div>

            <div className="">
              <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-2">
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

                <div className="flex flex-row gap-2">
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
                    {tasks.filter((task) => task.status).length} of{" "}
                    {tasks.length}
                  </Chip>
                </div>
              </div>
            </div>
          </div>

          <div className="max-h-full overflow-y-auto">
            <div className="flex flex-col justify-center gap-4 pb-28">
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
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                  <div className="flex p-2">
                    <LuNotepadText className="text-gray-400" size={64} />
                  </div>
                  <div className="text font-bold text-gray-300">
                    You don&#39;t have any tasks registered yet.
                  </div>
                  <div className="text font-normal text-gray-300">
                    Create tasks and organize your to-do items.
                  </div>
                </div>
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
        </div>
      </div>
      <ToastContainer
        containerId={1}
        limit={2}
        autoClose={1000}
        closeOnClick={true}
        pauseOnHover={false}
      />
    </Fade>
  );
}
