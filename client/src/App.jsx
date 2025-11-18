import { useState, useEffect } from 'react';

const API_BASE = "api/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    GetTodos();
  }, []);

  const GetTodos = async () => {
    const res = await fetch(API_BASE);
    const data = await res.json();
    setTodos(data);
  }

  const addTodo = async () => {
    if (!newTodo) return; 
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newTodo })
    });
    const data = await res.json();
    setTodos([...todos, data]);
    setNewTodo("");
  }

  const toggleTodo = async (id) => {
    const res = await fetch(API_BASE + "/" + id, { method: "PUT" });
    const data = await res.json();
    
    setTodos(todos.map(todo => {
      if (todo._id === data._id) {
        todo.completed = data.completed;
      }
      return todo;
    }));
  }

  const deleteTodo = async (id) => {
    await fetch(API_BASE + "/" + id, { method: "DELETE" });
    setTodos(todos.filter(todo => todo._id !== id));
  }

  return (
    // KEY CHANGE: Added "glass-container" class
    <div className="glass-container">
      <h1>Task Manager</h1>
      
      {/* KEY CHANGE: Added "input-group" and "add-btn" classes */}
      <div className="input-group">
        <input 
          type="text" 
          placeholder="What needs doing?" 
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          onKeyDown={e => e.key === 'Enter' ? addTodo() : ''}
        />
        <button className="add-btn" onClick={addTodo}>+</button>
      </div>

      <ul>
        {todos.map(todo => (
          // KEY CHANGE: Added "todo-item" and "delete-btn" classes
          <li key={todo._id} className="todo-item">
            <span 
              className={`todo-text ${todo.completed ? "is-complete" : ""}`}
              onClick={() => toggleTodo(todo._id)}
            >
              {todo.text}
            </span>
            
            <button className="delete-btn" onClick={() => deleteTodo(todo._id)}>
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;