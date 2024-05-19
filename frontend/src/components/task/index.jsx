import React, { useState } from 'react';
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import styles from './Task.module.css';

function Task({ task, onDelete, onEdit }) {
  const [isChecked, setIsChecked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(task.name);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleEdit = () => {
    if (isEditing) {
      onEdit(task.id, editedName);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className={styles.task}>
      <input 
        className={styles.checkbox} 
        type="checkbox" 
        checked={isChecked} 
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
          <span className={isChecked ? styles.checked : ''}>{task.name}</span>
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
