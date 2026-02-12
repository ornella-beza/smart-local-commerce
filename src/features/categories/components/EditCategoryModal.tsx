import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { categoriesService } from '../services/categories.service';
import { Input } from '../../../components/ui/input';
import { Card } from '../../../components/ui/card';

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  category: {
    _id: string;
    name: string;
    description?: string;
    image?: string;
  } | null;
}

export function EditCategoryModal({ isOpen, onClose, onSuccess, category }: EditCategoryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && category) {
      // Pre-fill form with category data
      setFormData({
        name: category.name || '',
        description: category.description || '',
      });
      setImagePreview(category.image || null);
      setImageFile(null);
    }
  }, [isOpen, category]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('=== CATEGORY UPDATE FORM SUBMISSION STARTED ===');
    
    if (!category) {
      console.error('No category selected');
      setError('No category selected for editing');
      return;
    }
    
    setError(null);
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.name || !formData.name.trim()) {
        setError('Category name is required');
        setLoading(false);
        return;
      }

      console.log('Validation passed, proceeding with category update...');

      // Create FormData for multipart/form-data
      const submitFormData = new FormData();
      submitFormData.append('name', formData.name.trim());
      if (formData.description && formData.description.trim()) {
        submitFormData.append('description', formData.description.trim());
      }

      if (imageFile) {
        submitFormData.append('image', imageFile);
        console.log('New image file selected for update');
      } else {
        console.log('No new image selected, keeping existing image');
      }

      console.log('Updating category:', {
        id: category._id,
        name: formData.name,
        hasNewImage: !!imageFile,
      });

      const result = await categoriesService.updateCategory(category._id, submitFormData);
      console.log('Category updated successfully:', result);

      // Reset form
      setFormData({
        name: '',
        description: '',
      });
      setImageFile(null);
      setImagePreview(null);
      setLoading(false);
      
      // Close modal first, then refresh
      onClose();
      
      // Small delay to ensure modal closes, then refresh
      setTimeout(() => {
        onSuccess();
      }, 100);
    } catch (err: any) {
      console.error('Failed to update category:', err);
      const errorMessage = err.message || 'Failed to update category. Please try again.';
      setError(errorMessage);
      setLoading(false);
    }
  };

  if (!isOpen || !category) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto m-4 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Edit Category</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full"
              placeholder="e.g., Electronics, Clothing, Food"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter category description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Image
            </label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {imageFile ? 'New image selected' : 'Current image'}
                </p>
                {imageFile && (
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(category?.image || null);
                    }}
                    className="mt-1 text-xs text-red-600 hover:text-red-800"
                  >
                    Remove new image
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Category'}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
