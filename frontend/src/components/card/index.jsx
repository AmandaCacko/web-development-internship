import React, { useState, useEffect } from "react";
import Input from "../input";
import Task from "../task";
import styles from "./Card.module.css";
import axios from "axios";

function Card() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/tasks")
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error("Erro ao carregar tarefas:", error);
      });
  }, []);

  const handleNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (taskName) {
      axios.post("http://localhost:8080/tasks", { name: taskName, state: "OPEN" })
        .then(response => {
          setTasks([...tasks, response.data]);
          setTaskName("");
        })
        .catch(error => {
          console.error("Erro ao criar tarefa:", error);
        });
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter(task => task.id !== id));
      })
      .catch(error => {
        console.error("Erro ao excluir tarefa:", error);
      });
  };

  const handleEdit = (id, newName, newState) => {
    axios.put(`http://localhost:8080/tasks/${id}`, { name: newName, state: newState })
      .then(response => {
        setTasks(tasks.map(task =>
          task.id === id ? response.data : task
        ));
      })
      .catch(error => {
        console.error("Erro ao atualizar tarefa:", error);
      });
  };

  const toggleTaskState = (id, currentState, currentName) => {
    const newState = currentState === "OPEN" ? "DONE" : "OPEN";
    handleEdit(id, currentName, newState);
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
            onToggleState={() => toggleTaskState(task.id, task.state, task.name)}
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
