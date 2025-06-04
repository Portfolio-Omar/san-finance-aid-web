
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Star } from 'lucide-react';

interface Testimonial {
  id: string;
  customer_name: string;
  customer_location: string | null;
  testimonial_content: string;
  rating: number | null;
  created_at: string;
}

export const TestimonialsList = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetchApprovedTestimonials();
  }, []);

  const fetchApprovedTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('id, customer_name, customer_location, testimonial_content, rating, created_at')
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching testimonials:', error);
        return;
      }

      setTestimonials(data || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (testimonials.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Customer Testimonials</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            No testimonials available yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Testimonials</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="border-b pb-6 last:border-b-0">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-black font-semibold">
                {testimonial.customer_name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold">{testimonial.customer_name}</span>
                  {testimonial.customer_location && (
                    <span className="text-sm text-muted-foreground">
                      • {testimonial.customer_location}
                    </span>
                  )}
                </div>
                
                {testimonial.rating && (
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating! ? 'text-gold fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                )}
                
                <p className="text-gray-700 mb-2">{testimonial.testimonial_content}</p>
                
                <span className="text-xs text-muted-foreground">
                  {formatDate(testimonial.created_at)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
