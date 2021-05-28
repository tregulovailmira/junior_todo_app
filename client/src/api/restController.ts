import http from './interceptor';

export const loginRequest = (data: any) => {
  return http.post('/auth/login', data);
};
