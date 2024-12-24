import { useState, useEffect } from "react";
import { Task } from "@/types/Task";
import { fetchTaskById } from "@/services/task.service";

const useFetchTaskById = (id: string) => {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchTaskById(id);
        setTask(data);
      } catch (err) {
        console.error(err);
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [id]);

  return { task, loading, error };
};

export default useFetchTaskById;
