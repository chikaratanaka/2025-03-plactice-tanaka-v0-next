import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type FormData = {
  text: string;
};

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const { register, handleSubmit, reset } = useForm<FormData>();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch("/api/todos");
      const data = await response.json();
      setTodos(data);
    };
    fetchTodos();
  }, []);

  const onSubmit = async (data: FormData) => {
    const trimmedText = data.text.trim();
    if (trimmedText === "") return;

    const response = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: trimmedText }),
    });

    const newTodo = await response.json();
    setTodos([...todos, newTodo]);
    reset(); // 入力欄リセット
  };

  const deleteTodo = async (id: number) => {
    await fetch("/api/todos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = async (id: number, completed: boolean) => {
    await fetch("/api/todos", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, completed: !completed }),
    });

    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-blue-50 p-4 font-rounded">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          TODOリスト
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex gap-3 mb-6"
        >
          <input
            {...register("text")}
            placeholder="新しいタスクを入力"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            追加
          </button>
        </form>

        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">未完了のTodo</h2>
          <ul className="space-y-3">
            {todos.filter((todo) => !todo.completed).map((todo) => (
              <li
                key={todo.id}
                className="flex justify-between items-center bg-blue-100 px-4 py-2 rounded-lg shadow-sm"
              >
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id, todo.completed)}
                  />
                  <span>{todo.text}</span>
                </label>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">完了したTodo</h2>
          <ul className="space-y-3">
            {todos.filter((todo) => todo.completed).map((todo) => (
              <li
                key={todo.id}
                className="flex justify-between items-center bg-amber-100 px-4 py-2 rounded-lg shadow-sm"
              >
                <label className="flex items-center gap-2 line-through text-gray-500">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id, todo.completed)}
                  />
                  <span>{todo.text}</span>
                </label>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-400 hover:text-red-600 transition"
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
