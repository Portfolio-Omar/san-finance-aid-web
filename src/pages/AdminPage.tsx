
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trash2, Mail, Phone, Calendar, User, MessageSquare, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ContactSubmission {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  loan_type: string | null;
  message: string;
  created_at: string;
  is_read: boolean;
}

const AdminPage = () => {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1200') {
      setIsAuthenticated(true);
      toast({
        title: "Access Granted",
        description: "Welcome to the admin panel.",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid PIN. Please try again.",
        variant: "destructive"
      });
      setPin('');
    }
  };

  const fetchSubmissions = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching submissions:', error);
        toast({
          title: "Error",
          description: "Failed to fetch submissions.",
          variant: "destructive"
        });
      } else {
        setSubmissions(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ is_read: true })
        .eq('id', id);

      if (error) {
        console.error('Error marking as read:', error);
      } else {
        setSubmissions(submissions.map(sub => 
          sub.id === id ? { ...sub, is_read: true } : sub
        ));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteSubmission = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting submission:', error);
        toast({
          title: "Error",
          description: "Failed to delete submission.",
          variant: "destructive"
        });
      } else {
        setSubmissions(submissions.filter(sub => sub.id !== id));
        setIsDialogOpen(false);
        setSelectedSubmission(null);
        toast({
          title: "Deleted",
          description: "Submission deleted successfully.",
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const openSubmission = (submission: ContactSubmission) => {
    setSelectedSubmission(submission);
    setIsDialogOpen(true);
    if (!submission.is_read) {
      markAsRead(submission.id);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubmissions();
    }
  }, [isAuthenticated]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getServiceLabel = (loanType: string | null) => {
    if (!loanType) return 'General Inquiry';
    
    const labels: Record<string, string> = {
      'personal-loan': 'Personal Loan',
      'business-loan': 'Business Loan',
      'corporate-loan': 'High Corporate Loan',
      'consultancy': 'Financial Consultancy',
      'debt-management': 'Debt Management',
      'other': 'Other'
    };
    
    return labels[loanType] || loanType;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-accent/30 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Admin Access</CardTitle>
            <p className="text-center text-muted-foreground">
              Enter PIN to access the admin panel
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePinSubmit} className="space-y-4">
              <Input
                type="password"
                placeholder="Enter PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="text-center text-lg"
                maxLength={4}
              />
              <Button type="submit" className="w-full">
                Access Admin Panel
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-accent/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">Manage customer enquiries and submissions</p>
        </div>

        <Tabs defaultValue="enquiries" className="w-full">
          <TabsList className="grid w-full grid-cols-1 max-w-md">
            <TabsTrigger value="enquiries">Customer Enquiries</TabsTrigger>
          </TabsList>

          <TabsContent value="enquiries" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Contact Form Submissions</CardTitle>
                <Button onClick={fetchSubmissions} disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Refresh'}
                </Button>
              </CardHeader>
              <CardContent>
                {submissions.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No submissions yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {submissions.map((submission) => (
                      <Card
                        key={submission.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          !submission.is_read ? 'border-primary bg-primary/5' : ''
                        }`}
                        onClick={() => openSubmission(submission)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="font-semibold">{submission.full_name}</span>
                                {!submission.is_read && (
                                  <Badge variant="secondary" className="text-xs">New</Badge>
                                )}
                              </div>
                              
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                                <div className="flex items-center gap-1">
                                  <Mail className="h-3 w-3" />
                                  {submission.email}
                                </div>
                                {submission.phone && (
                                  <div className="flex items-center gap-1">
                                    <Phone className="h-3 w-3" />
                                    {submission.phone}
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline">
                                  {getServiceLabel(submission.loan_type)}
                                </Badge>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Calendar className="h-3 w-3" />
                                  {formatDate(submission.created_at)}
                                </div>
                              </div>

                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {submission.message}
                              </p>
                            </div>
                            
                            <div className="flex items-center gap-2 ml-4">
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Submission Detail Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            {selectedSubmission && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    {selectedSubmission.full_name}
                  </DialogTitle>
                  <DialogDescription>
                    Submitted on {formatDate(selectedSubmission.created_at)}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedSubmission.email}</span>
                      </div>
                    </div>
                    
                    {selectedSubmission.phone && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Phone</label>
                        <div className="flex items-center gap-2 mt-1">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{selectedSubmission.phone}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Service Interest</label>
                    <div className="mt-1">
                      <Badge variant="outline">
                        {getServiceLabel(selectedSubmission.loan_type)}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Message</label>
                    <div className="mt-2 p-4 bg-accent/50 rounded-lg">
                      <p className="whitespace-pre-wrap">{selectedSubmission.message}</p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4 border-t">
                    <Button
                      variant="destructive"
                      onClick={() => deleteSubmission(selectedSubmission.id)}
                      className="flex items-center gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Close
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminPage;
