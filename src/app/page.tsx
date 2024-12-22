import Button from "@/components/button/Button";

export default function Home() {
  return (
    <div className="flex min-h-screen justify-center pt-16">
      <main className="flex w-1/2 flex-col gap-8">
        <div className="flex items-center justify-center">
          <div className="text-2xl font-bold">Todo App</div>
        </div>

        <Button>Create Task</Button>

        <div className="flex flex-row justify-between">
          <div className="text text-primary-light font-bold">Tasks</div>
          <div className="text text-secondary-light font-bold">Completed</div>
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <div className="text font-bold text-gray-300">
            You don&#39;t have any tasks registered yet.
          </div>
          <div className="text font-normal text-gray-300">
            Create tasks and organize your to-do items.
          </div>
        </div>
      </main>
    </div>
  );
}
