import React, { useState } from 'react';
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import styles from './Task.module.css';

function Task({ task, onDelete, onEdit, onToggleState }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(task.name);

  const handleCheckboxChange = () => {
    onToggleState(task.id, task.state);
  };

  const handleEdit = () => {
    if (isEditing) {
      onEdit(task.id, editedName, task.state);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className={styles.task}>
      <input 
        className={styles.checkbox} 
        type="checkbox" 
        checked={task.state === "DONE"} 
        onChange={handleCheckboxChange} 
      />
      <div className={styles.taskInfo}>
        {isEditing ? (
          <input 
            type="text" 
            value={editedName} 
            onChange={(e) => setEditedName(e.target.value)} 
          />
        ) : (
          <span className={task.state === "DONE" ? styles.checked : ''}>{task.name}</span>
        )}
      </div>
      <div className={styles.actionBtn}>
        <button 
          className={`${styles.editBtn} ${isEditing ? styles.checkBtn : ''}`} 
          onClick={handleEdit}
        >
          {isEditing ? <FaCheck /> : <FaEdit />}
        </button>
        <button className={styles.deleteBtn} onClick={() => onDelete(task.id)}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default Task;
