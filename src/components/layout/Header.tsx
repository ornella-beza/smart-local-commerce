import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Heart } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

export function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    setSearchTerm('');
  };

  return (
    <div className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-2 sm:py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <Link to="/" className="text-lg sm:text-xl lg:text-2xl font-bold whitespace-nowrap">
            NiceShop
          </Link>
          
          <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-xl">
            <div className="relative w-full">
              <Input 
                type="text" 
                placeholder="Search..." 
                className="w-full pr-10 h-9 lg:h-11 rounded-lg bg-muted/30 text-sm"
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              />
              <Button 
                type="submit"
                size="icon" 
                className="absolute right-1 top-1 h-7 w-7 lg:h-9 lg:w-9 rounded-md"
              >
                <Search className="w-3 h-3 lg:w-4 lg:h-4" />
              </Button>
            </div>
          </form>
          
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-4">
            <Button variant="ghost" size="icon" className="sm:hidden h-8 w-8">
              <Search className="w-4 h-4" />
            </Button>
            
            <Link to="/login">
              <Button variant="ghost" size="icon" className="h-8 w-8 lg:h-10 lg:w-10">
                <User className="w-4 h-4 lg:w-5 lg:h-5" />
              </Button>
            </Link>
            
            <Button variant="ghost" size="icon" className="relative h-8 w-8 lg:h-10 lg:w-10 hidden md:flex">
              <Heart className="w-4 h-4 lg:w-5 lg:h-5" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 lg:h-5 lg:w-5 flex items-center justify-center p-0 text-xs bg-primary">
                0
              </Badge>
            </Button>
          </div>
        </div>
        
        <form onSubmit={handleSearch} className="sm:hidden mt-3">
          <div className="relative">
            <Input 
              type="text" 
              placeholder="Search..." 
              className="w-full pr-10 h-9 rounded-lg bg-muted/30 text-sm"
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
            <Button 
              type="submit"
              size="icon" 
              className="absolute right-1 top-1 h-7 w-7 rounded-md"
            >
              <Search className="w-3 h-3" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
