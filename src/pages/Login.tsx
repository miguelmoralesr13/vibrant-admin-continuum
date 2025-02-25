
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { login } from '@/lib/api';
import { useAuthStore } from '@/lib/store';
import { useState } from 'react';
import { toast } from 'sonner';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const data = await login(values.email, values.password);
        setToken(data.token);
        setUser(data.user);
        toast.success('Welcome back!');
        navigate('/dashboard');
      } catch (error) {
        toast.error('Invalid credentials');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <Card gradient className="w-full">
      <Card.Header>
        <Card.Title>Welcome back</Card.Title>
        <Card.Description>Enter your credentials to continue</Card.Description>
      </Card.Header>
      <Card.Content>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.touched.email ? formik.errors.email : undefined}
            />
          </div>
          <div>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.touched.password ? formik.errors.password : undefined}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </Card.Content>
      <Card.Footer className="flex justify-between">
        <Button variant="link" onClick={() => navigate('/forgot-password')}>
          Forgot password?
        </Button>
      </Card.Footer>
    </Card>
  );
}
