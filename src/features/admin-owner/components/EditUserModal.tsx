import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
}

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  user: User | null;
}

export function EditUserModal({ isOpen, onClose, onSuccess, user }: EditUserModalProps) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'business_owner',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);
      const { adminService } = await import('../services/admin.service');
      await adminService.updateUser(user._id, formData);
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Failed to update user:', error);
      alert(error.message || 'Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Card className="p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold mb-4">Edit User</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="admin">Admin</option>
              <option value="business_owner">Business Owner</option>
              <option value="customer">Customer</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update User'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
