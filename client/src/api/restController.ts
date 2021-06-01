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

export const deleteUserTodo = (id: number) => {
  return http.delete(`user/todos/${id}`);
};

export const createUserTodo = (data: any) => {
  return http.post('user/todos', data);
};

export const uploadAttachmentByUser = (data: any) => {
  const formData = new FormData();
  formData.set('file', data.file, data.file.name);
  return http.post(`user/todos/${data.todoId}/attachments/upload`, formData, {
    headers: {
      'Content-type': 'multipart/form-data',
    },
  });
};
