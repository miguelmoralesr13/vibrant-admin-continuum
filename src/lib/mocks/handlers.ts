
import { http, HttpResponse } from 'msw';
import { useDevToolsStore } from '../store';

// Mock data
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

export const handlers = [
  // Auth endpoints
  http.post('/api/auth/login', async ({ request }) => {
    const { email, password } = await request.json();
    
    // Simulate API delay from DevTools store
    await new Promise(resolve => 
      setTimeout(resolve, useDevToolsStore.getState().apiDelay)
    );

    if (email === 'admin@example.com' && password === 'password') {
      return HttpResponse.json({
        token: 'mock-jwt-token',
        user: { id: 1, email, name: 'Admin User' }
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
    const newUser = await request.json();
    users.push({ ...newUser, id: users.length + 1 });
    return HttpResponse.json(newUser);
  }),
];
