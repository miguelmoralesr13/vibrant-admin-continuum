
import { http, HttpResponse } from 'msw';
import { useDevToolsStore } from '../store';

// Define interfaces for our data types
interface User {
  id: number;
  name: string;
  email: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

// Mock data
const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

export const handlers = [
  // Auth endpoints
  http.post('/api/auth/login', async ({ request }) => {
    const data = await request.json() as LoginRequest;
    
    // Simulate API delay from DevTools store
    await new Promise(resolve => 
      setTimeout(resolve, useDevToolsStore.getState().apiDelay)
    );

    if (data.email === 'admin@example.com' && data.password === 'password') {
      return HttpResponse.json({
        token: 'mock-jwt-token',
        user: { id: 1, email: data.email, name: 'Admin User' }
      });
    }

    return new HttpResponse(null, { status: 401 });
  }),

  // Users endpoints
  http.get('/api/users', async () => {
    await new Promise(resolve => 
      setTimeout(resolve, useDevToolsStore.getState().apiDelay)
    );
    
    return HttpResponse.json(users);
  }),

  http.post('/api/users', async ({ request }) => {
    const newUserData = await request.json() as Omit<User, 'id'>;
    const newUser: User = {
      ...newUserData,
      id: users.length + 1
    };
    users.push(newUser);
    return HttpResponse.json(newUser);
  }),
];
