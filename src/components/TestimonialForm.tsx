
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Star, Send } from 'lucide-react';

export const TestimonialForm = () => {
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_location: '',
    testimonial_content: '',
    rating: 5
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customer_name || !formData.customer_email || !formData.testimonial_content) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('testimonials')
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "Testimonial Submitted!",
        description: "Thank you for your feedback. Your testimonial has been submitted for review.",
      });

      setFormData({
        customer_name: '',
        customer_email: '',
        customer_location: '',
        testimonial_content: '',
        rating: 5
      });
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      toast({
        title: "Error",
        description: "Failed to submit testimonial. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-gold" />
          Share Your Experience
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customer_name">Name *</Label>
              <Input
                id="customer_name"
                value={formData.customer_name}
                onChange={(e) => setFormData(prev => ({ ...prev, customer_name: e.target.value }))}
                placeholder="Your full name"
                required
              />
            </div>
            <div>
              <Label htmlFor="customer_email">Email *</Label>
              <Input
                id="customer_email"
                type="email"
                value={formData.customer_email}
                onChange={(e) => setFormData(prev => ({ ...prev, customer_email: e.target.value }))}
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="customer_location">Location (Optional)</Label>
            <Input
              id="customer_location"
              value={formData.customer_location}
              onChange={(e) => setFormData(prev => ({ ...prev, customer_location: e.target.value }))}
              placeholder="City, Country"
            />
          </div>

          <div>
            <Label htmlFor="rating">Rating *</Label>
            <div className="flex items-center gap-2 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                  className={`p-1 ${star <= formData.rating ? 'text-gold' : 'text-gray-300'}`}
                >
                  <Star className="h-6 w-6 fill-current" />
                </button>
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {formData.rating} out of 5 stars
              </span>
            </div>
          </div>

          <div>
            <Label htmlFor="testimonial_content">Your Testimonial *</Label>
            <Textarea
              id="testimonial_content"
              value={formData.testimonial_content}
              onChange={(e) => setFormData(prev => ({ ...prev, testimonial_content: e.target.value }))}
              placeholder="Tell us about your experience with SAN Finance..."
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
            {isSubmitting ? 'Submitting...' : 'Submit Testimonial'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
