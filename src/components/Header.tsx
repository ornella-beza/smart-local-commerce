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
    if (!searchTerm.trim()) return;

    // Navigate to search results page with query
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    setSearchTerm('');
  };

  return (
    <div className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4 md:gap-8">
          <Link to="/" className="text-xl sm:text-2xl font-bold whitespace-nowrap">NiceShop</Link>
          
          <form onSubmit={handleSearch} className="flex-1 max-w-xl">
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Search..." 
                className="w-full pr-10 sm:pr-12 h-9 sm:h-11 rounded-lg bg-muted/30 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button 
                type="submit"
                size="icon" 
                className="absolute right-1 top-1 h-7 w-7 sm:h-9 sm:w-9 rounded-md"
              >
                <Search className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </div>
          </form>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <Link to="/login">
              <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </Link>
            
            <Button variant="ghost" size="icon" className="relative h-8 w-8 sm:h-10 sm:w-10 hidden sm:flex">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center p-0 text-xs bg-primary">
                0
              </Badge>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
