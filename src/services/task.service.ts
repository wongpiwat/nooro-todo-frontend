import { Task } from "@/types/Task";

const ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "";

export const fetchTasks = async () => {
  const response = await fetch(ENDPOINT, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const fetchTaskById = async (id: string) => {
  const response = await fetch(`${ENDPOINT}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const createTask = async (task: Task) => {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  const data = await response.json();
  return data;
};

export const updateTask = async (id: string, task: Task) => {
  const response = await fetch(`${ENDPOINT}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  const data = await response.json();
  return data;
};

export const deleteTask = async (id: string) => {
  const response = await fetch(`${ENDPOINT}/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};
