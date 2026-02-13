const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const blogService = {
  getBlogPosts: async () => {
    try {
      const response = await fetch(`${API_BASE}/blog`);
      if (!response.ok) throw new Error('Failed to fetch blog posts');
      return response.json();
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      // Fallback to mock data
      const { blogPosts } = await import('../../../data/mockData');
      return blogPosts;
    }
  },
  
  getBlogPost: async (id: string) => {
    try {
      const response = await fetch(`${API_BASE}/blog/${id}`);
      if (!response.ok) throw new Error('Failed to fetch blog post');
      return response.json();
    } catch (error) {
      console.error('Error fetching blog post:', error);
      // Fallback to mock data
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