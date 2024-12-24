import { useState, useEffect, useCallback } from "react";
import { Task } from "@/types/Task";
import { fetchTasks } from "@/services/task.service";

const useFetchTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const refresh = useCallback(() => {
    fetch();
  }, [fetch]);

  return { tasks, loading, error, refresh };
};

export default useFetchTasks;
