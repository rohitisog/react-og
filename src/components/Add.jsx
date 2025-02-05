import { useState } from "react";

function TodoApp() {
  const [tasks, setTasks] = useState([]); 
  const [task, setTask] = useState(""); 
  const [editIndex, setEditIndex] = useState(null); 

  const addTask = () => {
    if (task.trim() === "") return; 
    if (editIndex !== null) {
      // Editing existing task
      const updatedTasks = tasks.map((t, index) =>
        index === editIndex ? { ...t, text: task } : t
      );
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      // Adding new task
      setTasks([...tasks, { text: task, completed: false }]);
    }
    setTask(""); // Clear input
  };

  const editTask = (index) => {
    setTask(tasks[index].text); // Set input field to selected task
    setEditIndex(index); // Track the index being edited
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index)); // Remove selected task
  };

  const toggleTask = (index) => {
    setTasks(
      tasks.map((t, i) =>
        i === index ? { ...t, completed: !t.completed } : t
      )
    );
  };

  return (
    <div>
      <h2>Todo App</h2>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a task"
      />
      <button onClick={addTask}>{editIndex !== null ? "Update" : "Add"}</button>

      <ul>
        {tasks.map((t, index) => (
          <li key={index} style={{ textDecoration: t.completed ? "line-through" : "none" }}>
            <input type="checkbox" checked={t.completed} onChange={() => toggleTask(index)} />
            {t.text}
            <button onClick={() => editTask(index)}>✏️ Edit</button>
            <button onClick={() => deleteTask(index)}>❌ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
