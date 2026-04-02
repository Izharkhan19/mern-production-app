import { useState } from "react";
import axios from "axios";

export default function TodoList({ todos, setTodos, refresh }) {
  const [title, setTitle] = useState("");

  const addTodo = async () => {
    if (!title) return;
    const res = await axios.post("/api/todos", { title });
    setTodos([...todos, res.data]);
    setTitle("");
  };

  const toggleTodo = async (id) => {
    const todo = todos.find((t) => t._id === id);
    await axios.put(`/api/todos/${id}`, { completed: !todo.completed });
    refresh();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`/api/todos/${id}`);
    refresh();
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 border p-3 rounded-lg"
          placeholder="New todo..."
        />
        <button
          onClick={addTodo}
          className="bg-blue-600 text-white px-8 rounded-lg"
        >
          Add
        </button>
      </div>

      <div className="space-y-2">
        {todos.map((todo) => (
          <div
            key={todo._id}
            className="flex items-center justify-between bg-gray-100 p-4 rounded-xl"
          >
            <span className={todo.completed ? "line-through" : ""}>
              {todo.title}
            </span>
            <div className="flex gap-3">
              <button
                onClick={() => toggleTodo(todo._id)}
                className="text-green-600"
              >
                ✓
              </button>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="text-red-600"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
