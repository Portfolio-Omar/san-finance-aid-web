
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Star, Check, X, Eye } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Testimonial {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_location: string | null;
  testimonial_content: string;
  rating: number | null;
  is_approved: boolean;
  is_featured: boolean;
  created_at: string;
}

export const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching testimonials:', error);
        toast({
          title: "Error",
          description: "Failed to fetch testimonials.",
          variant: "destructive"
        });
      } else {
        setTestimonials(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTestimonial = async (id: string, updates: Partial<Testimonial>) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update(updates)
        .eq('id', id);

      if (error) {
        console.error('Error updating testimonial:', error);
        toast({
          title: "Error",
          description: "Failed to update testimonial.",
          variant: "destructive"
        });
      } else {
        setTestimonials(testimonials.map(t => 
          t.id === id ? { ...t, ...updates } : t
        ));
        toast({
          title: "Success",
          description: "Testimonial updated successfully.",
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteTestimonial = async (id: string) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting testimonial:', error);
        toast({
          title: "Error",
          description: "Failed to delete testimonial.",
          variant: "destructive"
        });
      } else {
        setTestimonials(testimonials.filter(t => t.id !== id));
        toast({
          title: "Success",
          description: "Testimonial deleted successfully.",
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Testimonials Management</CardTitle>
        <Button onClick={fetchTestimonials} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Refresh'}
        </Button>
      </CardHeader>
      <CardContent>
        {testimonials.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No testimonials yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testimonials.map((testimonial) => (
                  <TableRow key={testimonial.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{testimonial.customer_name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.customer_email}</div>
                        {testimonial.customer_location && (
                          <div className="text-xs text-muted-foreground">{testimonial.customer_location}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {testimonial.rating && (
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < testimonial.rating! ? 'text-gold fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate" title={testimonial.testimonial_content}>
                        {testimonial.testimonial_content}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Badge variant={testimonial.is_approved ? "default" : "secondary"}>
                          {testimonial.is_approved ? "Approved" : "Pending"}
                        </Badge>
                        {testimonial.is_featured && (
                          <Badge variant="outline">Featured</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(testimonial.created_at)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {!testimonial.is_approved && (
                          <Button
                            size="sm"
                            onClick={() => updateTestimonial(testimonial.id, { is_approved: true })}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateTestimonial(testimonial.id, { is_featured: !testimonial.is_featured })}
                        >
                          <Star className={`h-3 w-3 ${testimonial.is_featured ? 'fill-current' : ''}`} />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteTestimonial(testimonial.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
