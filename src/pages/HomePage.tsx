
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const HomePage = () => {
  const services = [
    {
      title: 'Personal Loans',
      description: 'Flexible personal financing solutions for your immediate needs.',
      rate: '37% monthly',
      icon: '👤'
    },
    {
      title: 'Business Loans',
      description: 'Fuel your business growth with our tailored business financing.',
      rate: '40% monthly',
      icon: '🏢'
    },
    {
      title: 'High Corporate Loans',
      description: 'Premium corporate financing for established businesses.',
      rate: '27% monthly',
      icon: '🏛️'
    },
    {
      title: 'Financial Consultancy',
      description: 'Expert financial planning and debt management advice.',
      rate: 'Custom rates',
      icon: '💼'
    }
  ];

  const whyChooseUs = [
    { title: 'Transparent Rates', description: 'No hidden fees, clear terms', icon: '📊' },
    { title: 'Flexible Repayment', description: 'Weekly or monthly options', icon: '📅' },
    { title: 'Expert Guidance', description: 'Professional financial advice', icon: '🎯' },
    { title: 'Fast Processing', description: 'Quick approval and disbursement', icon: '⚡' }
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      comment: 'SAN Finance helped me expand my business with their flexible business loan. Professional service!',
      rating: 5
    },
    {
      name: 'John D.',
      comment: 'Quick processing and transparent terms. Highly recommend their personal loan services.',
      rating: 5
    },
    {
      name: 'Maria K.',
      comment: 'The financial consultancy service helped me get back on track with my finances.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto mb-6 gradient-gold rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-3xl">SF</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
              Your Financial Aid
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Fast, secure, and personalized financial support for individuals and businesses.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="gradient-gold text-white hover:opacity-90 transition-opacity text-lg px-8 py-4"
              asChild
            >
              <Link to="/contact">Apply for a Loan</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-lg px-8 py-4"
              asChild
            >
              <Link to="/services">Get Financial Advice</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              About SAN Finance
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              SAN Finance is an online-based financial services provider offering flexible loan solutions and expert financial consulting. We support individuals and businesses through secure money lending and debt management, providing transparent, professional financial services tailored to your unique needs.
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive financial solutions designed to meet your personal and business needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{service.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
                  <Badge variant="secondary" className="gradient-gold text-white">
                    {service.rate}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild className="gradient-navy text-white hover:opacity-90">
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose SAN Finance?
            </h2>
            <p className="text-lg text-gray-600">
              We're committed to providing transparent, flexible, and professional financial services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600">
              Real experiences from satisfied customers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.comment}"</p>
                  <p className="font-semibold text-gray-900">- {testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 gradient-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Contact us today to discuss your financial needs and discover how we can help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="gradient-gold text-white hover:opacity-90 text-lg px-8 py-4"
              asChild
            >
              <Link to="/contact">Get in Touch</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-lg px-8 py-4"
              asChild
            >
              <Link to="/services">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
