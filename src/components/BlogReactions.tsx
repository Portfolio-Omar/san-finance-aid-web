
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Heart, ThumbsUp, Lightbulb, Star } from 'lucide-react';

interface BlogReactionsProps {
  postId: string;
}

interface Reaction {
  type: 'like' | 'love' | 'helpful' | 'insightful';
  count: number;
  userReacted: boolean;
}

export const BlogReactions = ({ postId }: BlogReactionsProps) => {
  const [reactions, setReactions] = useState<Reaction[]>([
    { type: 'like', count: 0, userReacted: false },
    { type: 'love', count: 0, userReacted: false },
    { type: 'helpful', count: 0, userReacted: false },
    { type: 'insightful', count: 0, userReacted: false },
  ]);
  const [userIP, setUserIP] = useState<string>('');
  const { toast } = useToast();

  const reactionIcons = {
    like: ThumbsUp,
    love: Heart,
    helpful: Star,
    insightful: Lightbulb,
  };

  const reactionLabels = {
    like: 'Like',
    love: 'Love',
    helpful: 'Helpful',
    insightful: 'Insightful',
  };

  useEffect(() => {
    // Get user IP (simplified - in production you'd use a proper IP service)
    setUserIP(Math.random().toString(36).substring(7));
    fetchReactions();
  }, [postId]);

  const fetchReactions = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_reactions')
        .select('reaction_type, user_ip')
        .eq('blog_post_id', postId);

      if (error) {
        console.error('Error fetching reactions:', error);
        return;
      }

      const reactionCounts = reactions.map(reaction => {
        const count = data?.filter(r => r.reaction_type === reaction.type).length || 0;
        const userReacted = data?.some(r => r.reaction_type === reaction.type && r.user_ip === userIP) || false;
        return { ...reaction, count, userReacted };
      });

      setReactions(reactionCounts);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleReaction = async (reactionType: 'like' | 'love' | 'helpful' | 'insightful') => {
    try {
      const existingReaction = reactions.find(r => r.type === reactionType);
      
      if (existingReaction?.userReacted) {
        // Remove reaction
        const { error } = await supabase
          .from('blog_reactions')
          .delete()
          .eq('blog_post_id', postId)
          .eq('user_ip', userIP)
          .eq('reaction_type', reactionType);

        if (error) throw error;
      } else {
        // Add reaction
        const { error } = await supabase
          .from('blog_reactions')
          .insert([{
            blog_post_id: postId,
            reaction_type: reactionType,
            user_ip: userIP,
          }]);

        if (error) throw error;
      }

      fetchReactions();
    } catch (error) {
      console.error('Error handling reaction:', error);
      toast({
        title: "Error",
        description: "Failed to update reaction. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg">
      <div className="w-full mb-2">
        <span className="text-sm font-medium text-gray-700">How do you feel about this article?</span>
      </div>
      {reactions.map((reaction) => {
        const Icon = reactionIcons[reaction.type];
        return (
          <Button
            key={reaction.type}
            variant={reaction.userReacted ? "default" : "outline"}
            size="sm"
            onClick={() => handleReaction(reaction.type)}
            className={`flex items-center gap-2 ${
              reaction.userReacted 
                ? 'bg-gold text-black hover:bg-gold/90' 
                : 'hover:bg-gold/10 hover:border-gold'
            }`}
          >
            <Icon className="h-4 w-4" />
            {reactionLabels[reaction.type]}
            {reaction.count > 0 && (
              <span className="ml-1 text-xs bg-gray-200 px-1.5 py-0.5 rounded-full">
                {reaction.count}
              </span>
            )}
          </Button>
        );
      })}
    </div>
  );
};
