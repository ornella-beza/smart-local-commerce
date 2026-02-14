import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { blogService } from '../services/blog.service';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react';

export function BlogDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      
      try {
        const [postData, allPosts] = await Promise.all([
          blogService.getBlogPost(id),
          blogService.getBlogPosts()
        ]);
        
        setPost(postData);
        setRelatedPosts(allPosts.filter((p: any) => p._id !== id).slice(0, 2));
      } catch (err) {
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="skeleton h-6 w-32 mb-8 rounded" />
          <div className="skeleton h-8 w-24 mb-4 rounded" />
          <div className="skeleton h-16 w-full mb-6 rounded" />
          <div className="skeleton h-96 w-full mb-8 rounded-xl" />
          <div className="space-y-4">
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-4 w-3/4 rounded" />
            <div className="skeleton h-4 w-5/6 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Blog post not found</h1>
          <Link to="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link to="/blog" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <article>
          <Badge className="mb-4">{post.category}</Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
          
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span className="font-medium">{typeof post.author === 'object' ? post.author.name : post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <img
            src={post.featuredImage || post.image}
            alt={post.title}
            className="w-full h-96 object-cover rounded-xl mb-8"
          />

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              {post.excerpt}
            </p>
            
            <div className="text-lg leading-relaxed space-y-4">
              {post.content.split('\n\n').map((paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <Card className="mt-12">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Written by</p>
                  <p className="font-bold text-lg">{typeof post.author === 'object' ? post.author.name : post.author}</p>
                </div>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Article
                </Button>
              </div>
            </CardContent>
          </Card>

          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h3 className="font-bold text-2xl mb-6">More Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost._id} to={`/blog/${relatedPost._id}`}>
                    <Card className="hover:shadow-lg transition-shadow">
                      <img
                        src={relatedPost.featuredImage || relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-40 object-cover"
                      />
                      <CardContent className="p-4">
                        <Badge className="mb-2 text-xs">{relatedPost.category}</Badge>
                        <h4 className="font-bold mb-2 line-clamp-2">{relatedPost.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}