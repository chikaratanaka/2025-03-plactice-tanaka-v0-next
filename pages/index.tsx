import { useState, useEffect } from "react"; // reactのフックをimport

type Todo = { 
  id: number; 
  text: string; 
  completed: boolean; 
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState<string>("");

  //DBからTodoを取得
  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch('/api/todos');
      const data = await response.json();
      setTodos(data);
    };
    fetchTodos();
  }, []);

  //新規追加
  const addTodo = async () => {
    const trimmedText = inputText.trim();
    if (trimmedText === "") return;

    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: trimmedText }),
    });

    const newTodo = await response.json();
    setTodos([...todos, newTodo]);
    setInputText("");
  };

  //削除
  const deleteTodo = async (id: number) => {
    await fetch('/api/todos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setTodos(todos.filter(todo => todo.id !== id));
  };

  //完了状態の切り替え
  const toggleTodo = async (id: number, completed: boolean) => {
    await fetch('/api/todos', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, completed: !completed }),
    });

    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="todo-container">
      <h1>TODOリスト</h1>
      <input
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addTodo()} 
      />
      <button onClick={addTodo}>追加</button>

      <h2>未完了のTodo</h2>
      <ul>
        {todos.filter(todo => !todo.completed).map(todo => (
          <li key={todo.id}>  
            <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id, todo.completed)} />
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>削除</button>
          </li>
        ))}
      </ul>

      <h2>完了したTodo</h2>
      <ul>
        {todos.filter(todo => todo.completed).map(todo => (
          <li key={todo.id}> 
            <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id, todo.completed)} />
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
