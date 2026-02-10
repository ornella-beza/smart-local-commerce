import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { api } from '../services/api';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card } from './ui/card';

interface AddPromotionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface Shop {
  _id: string;
  name: string;
}

interface Category {
  _id: string;
  name: string;
}

export function AddPromotionModal({ isOpen, onClose, onSuccess }: AddPromotionModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    discountType: 'percentage' as 'percentage' | 'fixed',
    discountValue: '',
    location: '',
    startDate: '',
    endDate: '',
    shop: '',
    category: '',
    terms: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [shops, setShops] = useState<Shop[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Fetch shops and categories when modal opens
      // For business owners, fetch their own shops; for admins, fetch all shops
      const fetchData = async () => {
        try {
          const [shopsData, categoriesData] = await Promise.all([
            api.getMyShops().catch(() => api.getShops()), // Try getMyShops first, fallback to all shops
            api.getCategories(),
          ]);
          setShops(shopsData);
          setCategories(categoriesData);
        } catch (err) {
          console.error('Failed to fetch data:', err);
        }
      };
      fetchData();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      // Reset form when modal closes
      setFormData({
        title: '',
        description: '',
        discountType: 'percentage',
        discountValue: '',
        location: '',
        startDate: '',
        endDate: '',
        shop: '',
        category: '',
        terms: '',
      });
      setImageFile(null);
      setImagePreview(null);
      setError(null);
    }
  }, [isOpen]);

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
    console.log('=== PROMOTION FORM SUBMISSION STARTED ===');
    
    setError(null);
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.title || !formData.description || !formData.discountValue || 
          !formData.location || !formData.startDate || !formData.endDate || !formData.shop) {
        const missingFields = [];
        if (!formData.title) missingFields.push('Title');
        if (!formData.description) missingFields.push('Description');
        if (!formData.discountValue) missingFields.push('Discount Value');
        if (!formData.location) missingFields.push('Location');
        if (!formData.startDate) missingFields.push('Start Date');
        if (!formData.endDate) missingFields.push('End Date');
        if (!formData.shop) missingFields.push('Shop');
        
        setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
        setLoading(false);
        return;
      }

      // Validate dates
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        setError('Please enter valid dates');
        setLoading(false);
        return;
      }

      if (endDate <= startDate) {
        setError('End date must be after start date');
        setLoading(false);
        return;
      }

      // Validate discount value
      const discountValueNum = parseFloat(formData.discountValue);
      if (isNaN(discountValueNum) || discountValueNum <= 0) {
        setError('Discount value must be a positive number');
        setLoading(false);
        return;
      }

      if (formData.discountType === 'percentage' && discountValueNum > 100) {
        setError('Percentage discount cannot exceed 100%');
        setLoading(false);
        return;
      }

      console.log('Validation passed, proceeding with promotion creation...');

      // Create FormData for multipart/form-data
      const submitFormData = new FormData();
      submitFormData.append('title', formData.title.trim());
      submitFormData.append('description', formData.description.trim());
      submitFormData.append('discountType', formData.discountType);
      submitFormData.append('discountValue', formData.discountValue);
      submitFormData.append('location', formData.location.trim());
      submitFormData.append('startDate', formData.startDate);
      submitFormData.append('endDate', formData.endDate);
      submitFormData.append('shop', formData.shop);
      
      if (formData.category && formData.category.trim()) {
        submitFormData.append('category', formData.category);
      }
      
      if (formData.terms && formData.terms.trim()) {
        submitFormData.append('terms', formData.terms.trim());
      }

      if (imageFile) {
        submitFormData.append('bannerImage', imageFile);
        console.log('Banner image file selected');
      }

      console.log('Creating promotion:', {
        title: formData.title,
        discountType: formData.discountType,
        discountValue: formData.discountValue,
        shop: formData.shop,
        hasImage: !!imageFile,
      });

      const result = await api.createPromotion(submitFormData);
      console.log('Promotion created successfully:', result);

      // Reset form
      setFormData({
        title: '',
        description: '',
        discountType: 'percentage',
        discountValue: '',
        location: '',
        startDate: '',
        endDate: '',
        shop: '',
        category: '',
        terms: '',
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
      console.error('Failed to create promotion:', err);
      const errorMessage = err.message || 'Failed to create promotion. Please try again.';
      setError(errorMessage);
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  // Get today's date in YYYY-MM-DD format for date input min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Add New Promotion</h2>
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
              Promotion Title <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full"
              placeholder="e.g., Summer Sale 2024"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe the promotion"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount Type <span className="text-red-500">*</span>
              </label>
              <Select
                value={formData.discountType}
                onValueChange={(value: 'percentage' | 'fixed') => 
                  setFormData((prev) => ({ ...prev, discountType: value }))
                }
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage (%)</SelectItem>
                  <SelectItem value="fixed">Fixed Amount (RWF)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount Value <span className="text-red-500">*</span>
              </label>
              <Input
                type="number"
                name="discountValue"
                value={formData.discountValue}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
                className="w-full"
                placeholder={formData.discountType === 'percentage' ? 'e.g., 20' : 'e.g., 5000'}
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.discountType === 'percentage' 
                  ? 'Enter percentage (0-100)' 
                  : 'Enter amount in RWF'}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shop <span className="text-red-500">*</span>
            </label>
            <Select
              value={formData.shop}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, shop: value }))}
              required
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select shop" />
              </SelectTrigger>
              <SelectContent>
                {shops.map((shop) => (
                  <SelectItem key={shop._id} value={shop._id}>
                    {shop.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category (Optional)
            </label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category (optional)" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              className="w-full"
              placeholder="e.g., Kigali - Kicukiro"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date <span className="text-red-500">*</span>
              </label>
              <Input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                required
                min={today}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date <span className="text-red-500">*</span>
              </label>
              <Input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                required
                min={formData.startDate || today}
                className="w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Terms & Conditions (Optional)
            </label>
            <textarea
              name="terms"
              value={formData.terms}
              onChange={handleInputChange}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter terms and conditions"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Banner Image (Optional)
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
              {loading ? 'Creating...' : 'Create Promotion'}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
