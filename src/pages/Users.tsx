
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
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4 p-8">
      <DataTable<User>
        data={users}
        columns={columns}
        title="Users"
        onAdd={() => setIsAddModalOpen(true)}
        onEdit={setEditingUser}
        onDelete={handleDelete}
      />
    </div>
  );
}
