package com.amanda.todolist.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.amanda.todolist.models.Task;
import com.amanda.todolist.repositories.TaskRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<Task> listTask() {
        return taskRepository.findAll();
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public Task getTask(Long id) {
        return taskRepository.getById(id);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    public void deleteAllTasks() {
        taskRepository.deleteAll();
    }

    public Task editTask(Long id, Task task) {
        Optional<Task> existingTask = taskRepository.findById(id);
        if (existingTask.isPresent()) {
            Task updatedTask = existingTask.get();
            updatedTask.setName(task.getName());
            updatedTask.setState(task.getState());
            return taskRepository.save(updatedTask);
        } else {
            return null;
        }
    }
}
