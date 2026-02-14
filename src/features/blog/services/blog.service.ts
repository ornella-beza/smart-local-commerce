const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const blogService = {
  getBlogPosts: async () => {
    try {
      console.log('Fetching from:', `${API_BASE}/blog`);
      const response = await fetch(`${API_BASE}/blog`);
      console.log('Response status:', response.status);
      if (!response.ok) throw new Error(`HTTP ${response.status}: Failed to fetch blog posts`);
      const data = await response.json();
      console.log('Fetched blog posts:', data);
      // Handle both array and object responses
      return Array.isArray(data) ? data : (data.posts || data.data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      console.log('Falling back to mock data');
      const { blogPosts } = await import('../../../data/mockData');
      return blogPosts;
    }
  },
  
  getBlogPost: async (id: string) => {
    try {
      console.log('Fetching post from:', `${API_BASE}/blog/id/${id}`);
      const response = await fetch(`${API_BASE}/blog/id/${id}`);
      console.log('Response status:', response.status);
      if (!response.ok) throw new Error(`HTTP ${response.status}: Failed to fetch blog post`);
      const data = await response.json();
      console.log('Fetched blog post:', data);
      return data;
    } catch (error) {
      console.error('Error fetching blog post:', error);
      console.log('Falling back to mock data');
      const { blogPosts } = await import('../../../data/mockData');
      return blogPosts.find((post: any) => post.id === id);
    }
  },
  
  createBlogPost: async (data: any) => {
    const response = await fetch(`${API_BASE}/blog`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },
  
  updateBlogPost: async (id: string, data: any) => {
    const response = await fetch(`${API_BASE}/blog/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },
  
  deleteBlogPost: async (id: string) => {
    const response = await fetch(`${API_BASE}/blog/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  },
  
  searchBlogPosts: async (query: string) => {
    const response = await fetch(`${API_BASE}/blog/search?q=${encodeURIComponent(query)}`);
    return response.json();
  }
};