import React, { useState } from "react";
import Input from "../input";
import Task from "../task";
import styles from "./Card.module.css";

function Card() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");

  const handleNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (taskName) {
      const newTask = {
        id: Date.now(),
        name: taskName
      };
      setTasks([...tasks, newTask]);
      setTaskName("");
    }
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEdit = (id, newName) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, name: newName } : task
    ));
  };

  return (
    <div className={styles.gradientStyle}>
      <h1>My To-do List</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input 
          label="Task's name" 
          value={taskName} 
          onChange={handleNameChange} 
        />
        <button type="submit" className={styles.btnSend}>
          SEND
        </button>
      </form>
      <div className={styles.tasksList}>
        {tasks.map(task => (
          <Task 
            key={task.id} 
            task={task} 
            onDelete={handleDelete} 
            onEdit={handleEdit} 
          />
        ))}
      </div>
      {tasks.length > 0 && (
        <button className={styles.btnSend} onClick={() => setTasks([])}>
          DELETE ALL TASKS
        </button>
      )}
    </div>
  );
}

export default Card;
