import { useState, useEffect } from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState<string>("");

  // LocalStorage から読み込み（初回のみ）
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // LocalStorage に保存（`todos` が変わるたび）
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // 新規追加
  const addTodo = () => {
    const trimmedText = inputText.trim();
    if (trimmedText === "") return;
    const newTodo: Todo = { id: Date.now(), text: trimmedText, completed: false };
    setTodos([...todos, newTodo]);
    setInputText("");
  };

  // 完了状態の切り替え
  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  // 削除
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="todo-container">
      <h1>TODOリスト</h1>
      <input
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addTodo()} // ✅ Enterキーでも追加可能
      />
      <button onClick={addTodo}>追加</button>

      <h2>未完了のTodo</h2>
      <ul>
        {todos.filter(todo => !todo.completed).map(todo => (
          <li key={todo.id}>  {/* ✅ `<>` は不要！ */}
            <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>削除</button>
          </li>
        ))}
      </ul>

      <h2>完了したTodo</h2>
      <ul>
        {todos.filter(todo => todo.completed).map(todo => (
          <li key={todo.id}>  {/* ✅ `<>` は不要！ */}
            <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
