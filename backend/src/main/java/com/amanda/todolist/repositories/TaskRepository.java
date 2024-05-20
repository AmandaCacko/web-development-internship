package com.amanda.todolist.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.amanda.todolist.models.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
