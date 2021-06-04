import { TodoStatus } from './enums';
import { ORDER_FOR_DB } from './components/UsersTable';

export interface Todo {
  id: number;
  header: string;
  body: string;
  userId: number;
  status: TodoStatus;
  deadline: Date;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface DataForAuth {
  username: string;
  password: string;
}

export interface DataForUpdateStatus {
  id: number;
  status: string;
}

export interface DataForUploadAttachment {
  file: File;
  todoId: number;
}

export interface MyError {
  statusCode: number;
  error: string;
  message: string;
}

export interface DbFilters {
  order: {
    [key: string]: ORDER_FOR_DB;
  };
  take: number;
  skip: number;
}
