import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask.trim()]);
      setNewTask("");
    }
  };


  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };


  const editTask = (index) => {
    setEditingIndex(index);
    setEditingText(tasks[index]);
  };

  const saveTask = () => {
    const updatedTasks = tasks.map((task, i) =>
      i === editingIndex ? editingText : task
    );
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditingText("");
  };

  
  const sortTasks = () => {
    const sortedTasks = [...tasks].sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: "base" })
    );
    setTasks(sortedTasks);
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <div className="input-section">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add Task</button>
        <button onClick={sortTasks}>Sort Tasks</button>
      </div>

      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            {editingIndex === index ? (
              <div className="edit-section">
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={saveTask}>Save</button>
              </div>
            ) : (
              <div className="task-content">
                <span>{task}</span>
                <button onClick={() => editTask(index)}>Edit</button>
                <button onClick={() => deleteTask(index)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

