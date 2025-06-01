
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    loanType: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting SAN Finance. We'll get back to you within 24 hours.",
    });
    setFormData({ fullName: '', email: '', loanType: '', message: '' });
  };

  const handleWhatsApp = () => {
    const phoneNumber = "+260773507707";
    const message = "Hello SAN Finance, I'm interested in your financial services.";
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const contactMethods = [
    {
      title: 'WhatsApp / Phone',
      value: '+260 773507707',
      description: 'Chat with us instantly or call for immediate assistance',
      icon: '📱',
      action: handleWhatsApp
    },
    {
      title: 'Email',
      value: 'sanfinance2023@gmail.com',
      description: 'Send us detailed inquiries via email',
      icon: '✉️',
      action: () => window.location.href = 'mailto:sanfinance2023@gmail.com'
    },
    {
      title: 'Facebook',
      value: 'SAN Finance',
      description: 'Connect with us on social media',
      icon: '📘',
      action: () => window.open('https://www.facebook.com/profile.php?id=100064148612577', '_blank')
    },
    {
      title: 'Instagram',
      value: '@sanfinance_',
      description: 'Follow us for updates and tips',
      icon: '📸',
      action: () => window.open('https://www.instagram.com/sanfinance_/', '_blank')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Get in Touch with SAN Finance
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to take the next step? Contact us today to discuss your financial needs and discover how we can help you achieve your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Methods */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Methods</h2>
            
            {contactMethods.map((method, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={method.action}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{method.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{method.title}</h3>
                      <p className="text-blue-600 font-medium mb-2">{method.value}</p>
                      <p className="text-sm text-gray-600">{method.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Business Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Business Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-900">Business Type</h4>
                    <p className="text-gray-600">Online Financial Services</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Location</h4>
                    <p className="text-gray-600">Virtual Business</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Operating Hours</h4>
                    <p className="text-gray-600">24/7 Online Support</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        required
                        className="w-full"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                        className="w-full"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="loanType">Service Interest</Label>
                    <Select 
                      value={formData.loanType} 
                      onValueChange={(value) => setFormData({...formData, loanType: value})}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a service you're interested in" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personal-loan">Personal Loan</SelectItem>
                        <SelectItem value="business-loan">Business Loan</SelectItem>
                        <SelectItem value="corporate-loan">High Corporate Loan</SelectItem>
                        <SelectItem value="consultancy">Financial Consultancy</SelectItem>
                        <SelectItem value="debt-management">Debt Management</SelectItem>
                        <SelectItem value="other">Other / General Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      required
                      className="w-full min-h-[120px]"
                      placeholder="Tell us about your financial needs, loan amount, timeline, or any questions you have..."
                    />
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Privacy Notice:</strong> Your information is secure and will only be used to provide you with financial services. We respect your privacy and will never share your details with third parties.
                    </p>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full gradient-gold text-white hover:opacity-90 transition-opacity py-3 text-lg"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Quick Contact Options */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                onClick={handleWhatsApp}
                className="h-16 bg-green-500 hover:bg-green-600 text-white text-lg"
              >
                <span className="mr-2">📱</span>
                Chat on WhatsApp
              </Button>
              <Button 
                onClick={() => window.location.href = 'mailto:sanfinance2023@gmail.com'}
                className="h-16 gradient-navy text-white hover:opacity-90 text-lg"
              >
                <span className="mr-2">✉️</span>
                Send Email
              </Button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">How fast can I get approved?</h4>
                  <p className="text-gray-600 text-sm">Most applications are processed within 24-48 hours after submission of all required documents.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">What documents do I need?</h4>
                  <p className="text-gray-600 text-sm">Valid ID, completed application, proof of income, and bank statements. Additional requirements may apply based on loan type.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Are there hidden fees?</h4>
                  <p className="text-gray-600 text-sm">No hidden fees. All costs are clearly outlined in your loan agreement before signing.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Can I repay early?</h4>
                  <p className="text-gray-600 text-sm">Yes, early repayment is allowed and may reduce your total interest costs. Contact us for details.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;
