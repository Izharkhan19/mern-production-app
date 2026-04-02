import { useState, useEffect } from "react";
import axios from "axios";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("/api/todos").then((res) => setTodos(res.data));
  }, []);

  const refresh = () =>
    axios.get("/api/todos").then((res) => setTodos(res.data));

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
        MERN Production Todo
      </h1>
      <TodoList todos={todos} setTodos={setTodos} refresh={refresh} />
    </div>
  );
}

export default App;
