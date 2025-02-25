
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/lib/services/api.service';
import { DataTable } from '@/components/ui/data-table';
import { toast } from 'sonner';

interface User {
  id: number;
  name: string;
  email: string;
}

const columns = [
  { key: 'id' as const, header: 'ID' },
  { key: 'name' as const, header: 'Name' },
  { key: 'email' as const, header: 'Email' },
];

export default function Users() {
  const queryClient = useQueryClient();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => apiService.get<User[]>('/users'),
  });

  const deleteMutation = useMutation({
    mutationFn: (userId: number) => apiService.delete(`/users/${userId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete user');
    },
  });

  const handleDelete = async (user: User) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      deleteMutation.mutate(user.id);
    }
  };

  if (isLoading) {
    return <div className="p-8" data-lov-id="src/pages/Users.tsx:49:6" data-lov-name="div" data-component-path="src/pages/Users.tsx" data-component-line="49" data-component-file="Users.tsx" data-component-name="div" data-component-content="%7B%22text%22%3A%22Loading...%22%2C%22className%22%3A%22p-8%22%7D">Loading...</div>;
  }

  return (
    <div className="space-y-4 p-8" data-lov-id="src/pages/Users.tsx:65:4" data-lov-name="div" data-component-path="src/pages/Users.tsx" data-component-line="65" data-component-file="Users.tsx" data-component-name="div" data-component-content="%7B%22className%22%3A%22space-y-4%20p-8%22%7D">
      <DataTable<User> 
        data={users}
        columns={columns}
        title="Users"
        onAdd={() => setIsAddModalOpen(true)}
        onEdit={(user) => setEditingUser(user)}
        onDelete={handleDelete}
        data-lov-id="src/pages/Users.tsx:75:6"
        data-lov-name="DataTable"
        data-component-path="src/pages/Users.tsx"
        data-component-line="75"
        data-component-file="Users.tsx"
        data-component-name="DataTable"
        data-component-content="%7B%7D"
      />
    </div>
  );
}
