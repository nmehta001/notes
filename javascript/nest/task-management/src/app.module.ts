import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './tasks/config/constants';

@Module({
  imports: [TasksModule, TypeOrmModule.forRoot(typeOrmConfig)],
})
export class AppModule {}
