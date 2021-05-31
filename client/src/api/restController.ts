import http from './interceptor';

export const loginRequest = (data: any) => {
  return http.post('/auth/login', data);
};

export const getUserTodos = () => {
  return http.get('/user/todos');
};

export const updateUserTodo = (data: any) => {
  return http.patch(`user/todos/${data.id}`, data);
};
