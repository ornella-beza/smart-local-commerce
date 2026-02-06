import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Heart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-8">
          <Link to="/" className="text-2xl font-bold">NiceShop</Link>
          
          <form onSubmit={handleSearch} className="flex-1 max-w-xl">
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Search for products or shops" 
                className="w-full pr-12 h-11 rounded-lg bg-muted/30"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button 
                type="submit"
                size="icon" 
                className="absolute right-1 top-1 h-9 w-9 rounded-md"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </form>
          
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" size="icon" className="relative">
                <User className="w-5 h-5" />
              </Button>
            </Link>
            
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary">
                0
              </Badge>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
