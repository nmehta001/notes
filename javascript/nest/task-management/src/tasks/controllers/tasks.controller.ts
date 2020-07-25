import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { TaskStatus } from '../types';
import { CreateTaskDto } from '../dto/create-task.dto';
import { GetTasksFilterDto } from '../dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from '../pipes/task-status-validation.pipe';
import { Task } from '../schemas/task.entity';

@Controller('tasks')
export class TasksController {
  public constructor(private tasksService: TasksService) {}

  @Get()
  public getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
  ): Promise<Array<Task>> {
    return this.tasksService.getTasks(filterDto);
  }

  @Get('/:id')
  public getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  public createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  public async deleteTask(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return await this.tasksService.deleteTask(id);
  }

  @Patch(':id/status')
  public async updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    return await this.tasksService.updateTaskStatus(id, status);
  }
}
