
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { forgotPassword } from '@/lib/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        await forgotPassword(values.email);
        toast.success('Password reset instructions sent to your email');
        navigate('/');
      } catch (error) {
        toast.error('Failed to process request');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <Card gradient className="w-full">
      <Card.Header>
        <Card.Title>Reset your password</Card.Title>
        <Card.Description>
          Enter your email address and we'll send you a link to reset your password
        </Card.Description>
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
              error={formik.touched.email && formik.errors.email}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send reset link'}
          </Button>
        </form>
      </Card.Content>
      <Card.Footer>
        <Button variant="link" onClick={() => navigate('/')} className="w-full">
          Back to login
        </Button>
      </Card.Footer>
    </Card>
  );
}
