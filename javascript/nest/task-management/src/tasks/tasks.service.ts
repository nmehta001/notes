import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { stat } from 'fs';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    console.log({ filterDto });

    const { status, search } = filterDto;

    console.log(filterDto);
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        task =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return tasks;
  }

  public getTaskById(id: string): Task {
    return this.tasks.find(task => task.id === id);
  }

  public createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: v4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  public deleteTask(id: string): boolean {
    const index = this.tasks.findIndex(task => task.id === id);

    if (index > -1) {
      this.tasks.splice(index, 1);
      return true;
    }

    return false;
  }

  public updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);

    task.status = status;

    return task;
  }
}
