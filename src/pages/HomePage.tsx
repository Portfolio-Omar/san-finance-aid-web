
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WelcomePopup } from '@/components/WelcomePopup';
import { FAQ } from '@/components/FAQ';

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
    { title: 'Integrity', description: 'Honesty and transparency in all dealings', icon: '🤝' },
    { title: 'Responsibility', description: 'Responsible lending and financial education', icon: '🛡️' },
    { title: 'Innovation', description: 'Continually improving our services', icon: '💡' },
    { title: 'Customer Focus', description: 'Tailored solutions for your needs', icon: '👥' }
  ];

  const testimonials = [
    {
      name: 'Nathan B.',
      comment: 'SAN Finance helped me expand my business with their flexible business loan. Professional service!',
      rating: 5
    },
    {
      name: 'Omar K.',
      comment: 'Quick processing and transparent terms. Highly recommend their personal loan services.',
      rating: 5
    },
    {
      name: 'David M.',
      comment: 'The financial consultancy service helped me get back on track with my finances.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      <WelcomePopup />
      
      {/* Hero Section */}
      <section 
        className="relative text-white py-20 lg:py-32 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url('/bg.jpg')"
        }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
              Your Financial Partner
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto animate-fade-in">
              Empowering individuals and businesses with accessible financial solutions that promote economic growth and stability.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in">
            <Button 
              size="lg" 
              className="gradient-gold text-white hover:opacity-90 transition-opacity text-lg px-8 py-4 animate-scale-in"
              asChild
            >
              <Link to="/contact">Apply for a Loan</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-lg px-8 py-4 animate-scale-in"
              asChild
            >
              <Link to="/services">Get Financial Advice</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8 animate-fade-in">
              About SAN Finance
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed animate-fade-in">
              <p>
                <strong className="text-foreground">Our Mission:</strong> To empower individuals and businesses with accessible financial solutions that promote economic growth and stability. SAN Finance is guided by integrity, transparency, innovation, customer focus, and responsibility.
              </p>
              <p>
                <strong className="text-foreground">Our Vision:</strong> To become Zambia's leading financial partner in sustainable lending and consultancy, pioneering Africa's name on the global financial stage.
              </p>
              <p>
                Founded in 2023 by Andrew Shota Daka and officially registered with PACRA, SAN Finance has served over 100 clients and actively engaged in community projects, especially financial literacy initiatives. As an African brand, we are committed to establishing our name, and Africa's, on the global financial stage.
              </p>
            </div>
            <div className="mt-8">
              <Button asChild className="gradient-navy text-white hover:opacity-90">
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 lg:py-24 bg-accent/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive financial solutions designed to meet your personal and business needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm">{service.description}</p>
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
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide everything we do at SAN Finance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center animate-fade-in hover:scale-105 transition-transform duration-300">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24 bg-accent/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Real experiences from satisfied customers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 animate-fade-in">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.comment}"</p>
                  <p className="font-semibold text-foreground">- {testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

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
