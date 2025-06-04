
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { MessageCircle, Send } from 'lucide-react';

interface BlogCommentsProps {
  postId: string;
}

interface Comment {
  id: string;
  author_name: string;
  author_email: string;
  content: string;
  created_at: string;
}

export const BlogComments = ({ postId }: BlogCommentsProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({
    author_name: '',
    author_email: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_comments')
        .select('*')
        .eq('blog_post_id', postId)
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching comments:', error);
        return;
      }

      setComments(data || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.author_name || !newComment.author_email || !newComment.content) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('blog_comments')
        .insert([{
          blog_post_id: postId,
          author_name: newComment.author_name,
          author_email: newComment.author_email,
          content: newComment.content,
        }]);

      if (error) throw error;

      toast({
        title: "Comment Submitted!",
        description: "Your comment has been submitted and is awaiting approval.",
      });

      setNewComment({ author_name: '', author_email: '', content: '' });
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast({
        title: "Error",
        description: "Failed to submit comment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Comments Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Comments ({comments.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No comments yet. Be the first to share your thoughts!
            </p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="border-b pb-4 last:border-b-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-black font-semibold text-sm">
                    {comment.author_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <span className="font-medium text-sm">{comment.author_name}</span>
                    <span className="text-xs text-muted-foreground ml-2">
                      {formatDate(comment.created_at)}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 ml-10">{comment.content}</p>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Comment Form */}
      <Card>
        <CardHeader>
          <CardTitle>Leave a Comment</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="author_name">Name *</Label>
                <Input
                  id="author_name"
                  value={newComment.author_name}
                  onChange={(e) => setNewComment(prev => ({ ...prev, author_name: e.target.value }))}
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="author_email">Email *</Label>
                <Input
                  id="author_email"
                  type="email"
                  value={newComment.author_email}
                  onChange={(e) => setNewComment(prev => ({ ...prev, author_email: e.target.value }))}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="content">Comment *</Label>
              <Textarea
                id="content"
                value={newComment.content}
                onChange={(e) => setNewComment(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Share your thoughts..."
                rows={4}
                required
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-gold hover:bg-gold/90 text-black"
            >
              <Send className="h-4 w-4" />
              {isSubmitting ? 'Submitting...' : 'Submit Comment'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
