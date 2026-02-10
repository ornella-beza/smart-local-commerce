import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { api } from '../services/api';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card } from './ui/card';

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  product: {
    _id: string;
    name: string;
    description?: string;
    price: number;
    originalPrice?: number;
    category: { _id: string; name: string } | string;
    shop?: { _id: string; name: string } | string;
    stock?: number;
    seller: string;
    location: string;
    image?: string;
  } | null;
}

interface Category {
  _id: string;
  name: string;
}

interface Shop {
  _id: string;
  name: string;
}

export function EditProductModal({ isOpen, onClose, onSuccess, product }: EditProductModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    shop: '',
    stock: '',
    seller: '',
    location: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && product) {
      // Pre-fill form with product data
      const categoryId = typeof product.category === 'object' ? product.category._id : product.category;
      const shopId = product.shop ? (typeof product.shop === 'object' ? product.shop._id : product.shop) : '';
      
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        originalPrice: product.originalPrice?.toString() || '',
        category: categoryId || '',
        shop: shopId || '',
        stock: product.stock?.toString() || '',
        seller: product.seller || '',
        location: product.location || '',
      });
      setImagePreview(product.image || null);
      setImageFile(null);
    }
  }, [isOpen, product]);

  useEffect(() => {
    if (isOpen) {
      // Fetch categories and shops when modal opens
      const fetchData = async () => {
        try {
          const [categoriesData, shopsData] = await Promise.all([
            api.getCategories(),
            api.getShops(),
          ]);
          setCategories(categoriesData);
          setShops(shopsData);
        } catch (err) {
          console.error('Failed to fetch data:', err);
        }
      };
      fetchData();
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
    console.log('=== FORM SUBMISSION STARTED ===');
    console.log('Form submitted!', { product: product?._id, formData });
    
    if (!product) {
      console.error('No product selected');
      setError('No product selected for editing');
      return;
    }
    
    setError(null);
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.name || !formData.price || !formData.category || !formData.seller || !formData.location) {
        const missingFields = [];
        if (!formData.name) missingFields.push('Name');
        if (!formData.price) missingFields.push('Price');
        if (!formData.category) missingFields.push('Category');
        if (!formData.seller) missingFields.push('Seller');
        if (!formData.location) missingFields.push('Location');
        
        setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
        setLoading(false);
        return;
      }
      
      console.log('Validation passed, proceeding with update...');

      // Create FormData for multipart/form-data
      const submitFormData = new FormData();
      submitFormData.append('name', formData.name.trim());
      submitFormData.append('description', formData.description?.trim() || '');
      submitFormData.append('price', formData.price);
      if (formData.originalPrice && formData.originalPrice.trim()) {
        submitFormData.append('originalPrice', formData.originalPrice);
      }
      submitFormData.append('category', formData.category);
      if (formData.shop && formData.shop.trim()) {
        submitFormData.append('shop', formData.shop);
      }
      submitFormData.append('stock', formData.stock || '0');
      submitFormData.append('seller', formData.seller.trim());
      submitFormData.append('location', formData.location.trim());

      // Always append image if a new file is selected, otherwise backend keeps existing
      if (imageFile) {
        submitFormData.append('image', imageFile);
        console.log('New image file selected for update');
      } else {
        console.log('No new image selected, keeping existing image');
      }

      console.log('Updating product:', {
        id: product._id,
        name: formData.name,
        price: formData.price,
        hasNewImage: !!imageFile,
      });

      const result = await api.updateProduct(product._id, submitFormData);
      console.log('Product updated successfully:', result);

      // Reset form
      setFormData({
        name: '',
        description: '',
        price: '',
        originalPrice: '',
        category: '',
        shop: '',
        stock: '',
        seller: '',
        location: '',
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
      console.error('Failed to update product:', err);
      const errorMessage = err.message || 'Failed to update product. Please try again.';
      setError(errorMessage);
      setLoading(false);
      // Don't close modal on error so user can see the error and retry
    }
  };

  if (!isOpen || !product) {
    console.log('EditProductModal: Not rendering - isOpen:', isOpen, 'product:', product);
    return null;
  }
  
  console.log('EditProductModal: Rendering with product:', product._id, product.name);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Edit Product</h2>
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
              Product Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full"
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
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (RWF) <span className="text-red-500">*</span>
              </label>
              <Input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Original Price (RWF)
              </label>
              <Input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
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
                Shop
              </label>
              <Select
                value={formData.shop}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, shop: value }))}
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
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock Quantity
              </label>
              <Input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                min="0"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Seller <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                name="seller"
                value={formData.seller}
                onChange={handleInputChange}
                required
                className="w-full"
              />
            </div>
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
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Image
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
                />
                <p className="text-xs text-gray-500 mt-1">
                  {imageFile ? 'New image selected' : 'Current image'}
                </p>
                {imageFile && (
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(product?.image || null);
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
              disabled={loading || !product}
              onClick={(e) => {
                console.log('Update button clicked', { 
                  loading, 
                  hasProduct: !!product,
                  buttonType: e.currentTarget.type,
                  formData: {
                    name: formData.name,
                    price: formData.price,
                    category: formData.category,
                    seller: formData.seller,
                    location: formData.location,
                  }
                });
                // Don't prevent default - let form submit naturally
              }}
            >
              {loading ? 'Updating...' : 'Update Product'}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
