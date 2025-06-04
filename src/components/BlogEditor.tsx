
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Save, Send } from 'lucide-react';
import { RichTextEditor } from './RichTextEditor';

interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  extract: string;
  content: string;
  image_url?: string;
  is_published: boolean;
}

interface BlogEditorProps {
  post?: BlogPost;
  onSave: () => void;
}

export const BlogEditor = ({ post, onSave }: BlogEditorProps) => {
  const [formData, setFormData] = useState<BlogPost>({
    title: post?.title || '',
    slug: post?.slug || '',
    extract: post?.extract || '',
    content: post?.content || '',
    image_url: post?.image_url || '',
    is_published: post?.is_published || false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  const handleImageUpload = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('blog-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSave = async (publish = false) => {
    if (!formData.title || !formData.extract || !formData.content) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      let imageUrl = formData.image_url;

      if (imageFile) {
        imageUrl = await handleImageUpload(imageFile);
      }

      const postData = {
        ...formData,
        image_url: imageUrl,
        is_published: publish,
        updated_at: new Date().toISOString()
      };

      if (post?.id) {
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', post.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([postData]);

        if (error) throw error;
      }

      toast({
        title: publish ? "Post Published!" : "Post Saved!",
        description: publish 
          ? "Your blog post has been published successfully." 
          : "Your blog post has been saved as draft.",
      });

      onSave();
    } catch (error) {
      console.error('Error saving post:', error);
      toast({
        title: "Error",
        description: "Failed to save the blog post. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{post ? 'Edit Blog Post' : 'Create New Blog Post'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Enter blog post title"
          />
        </div>

        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
            placeholder="auto-generated-from-title"
          />
        </div>

        <div>
          <Label htmlFor="extract">Extract *</Label>
          <Textarea
            id="extract"
            value={formData.extract}
            onChange={(e) => setFormData(prev => ({ ...prev, extract: e.target.value }))}
            placeholder="Brief summary of the blog post"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="content">Content *</Label>
          <RichTextEditor
            value={formData.content}
            onChange={(content) => setFormData(prev => ({ ...prev, content }))}
            placeholder="Write your blog post content here. Use the toolbar above for formatting."
            rows={15}
          />
        </div>

        <div>
          <Label htmlFor="image">Featured Image (Optional)</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setImageFile(file);
              }
            }}
          />
          {formData.image_url && (
            <div className="mt-2">
              <img 
                src={formData.image_url} 
                alt="Featured" 
                className="w-32 h-32 object-cover rounded"
              />
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-4">
          <Button
            onClick={() => handleSave(false)}
            disabled={isLoading}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            Save Draft
          </Button>
          <Button
            onClick={() => handleSave(true)}
            disabled={isLoading}
            className="flex items-center gap-2 bg-gold hover:bg-gold/90"
          >
            <Send className="h-4 w-4" />
            Publish
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
