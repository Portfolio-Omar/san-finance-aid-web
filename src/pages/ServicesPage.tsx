
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ServicesPage = () => {
  const loanTypes = [
    {
      title: 'Personal Loans',
      rate: '37% interest monthly',
      requirement: 'Requires collateral',
      description: 'Perfect for personal expenses, emergencies, or life events.',
      features: ['Quick approval', 'Flexible terms', 'Competitive rates', 'Secure process']
    },
    {
      title: 'Business Loans',
      rate: '40% interest monthly',
      requirement: 'Collateral required',
      description: 'Fuel your business growth with our commercial financing solutions.',
      features: ['Business expansion', 'Equipment purchase', 'Working capital', 'Inventory funding']
    },
    {
      title: 'High Corporate Loans',
      rate: '27% interest monthly',
      requirement: 'For repeat clients - Secured via debentures',
      description: 'Exclusive corporate financing for established business relationships.',
      features: ['Large loan amounts', 'Preferred rates', 'Priority processing', 'Dedicated support']
    }
  ];

  const repaymentTerms = [
    { period: '1 week', interest: '15%', description: 'Short-term quick solution' },
    { period: '2 weeks', interest: '25%', description: 'Flexible bi-weekly option' },
    { period: '3 weeks', interest: '35%', description: 'Extended short-term' },
    { period: '1 month', interest: '37%', description: 'Standard monthly term' }
  ];

  const eligibilityRequirements = [
    'Valid government-issued identification',
    'Completed loan application form',
    'Demonstrated ability to repay',
    'Appropriate security or debentures based on loan type',
    'Proof of income or business revenue',
    'Bank statements (last 3 months)'
  ];

  const consultancyServices = [
    {
      title: 'Financial Planning',
      description: 'Comprehensive financial strategy development',
      benefits: ['Budget optimization', 'Investment planning', 'Risk assessment', 'Goal setting']
    },
    {
      title: 'Debt Management',
      description: 'Professional debt restructuring and management',
      benefits: ['Debt consolidation', 'Payment planning', 'Credit improvement', 'Financial recovery']
    },
    {
      title: 'Personalized Budgeting',
      description: 'Tailored budget plans for your lifestyle',
      benefits: ['Expense tracking', 'Savings strategies', 'Cash flow management', 'Financial discipline']
    },
    {
      title: 'Credit Counseling',
      description: 'Expert guidance on credit management',
      benefits: ['Credit score improvement', 'Credit report analysis', 'Payment strategies', 'Financial education']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Our Financial Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive financial solutions tailored to meet your personal and business needs with transparent terms and professional support.
          </p>
        </div>

        {/* Money Lending Services */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Money Lending Services
            </h2>
            <p className="text-lg text-gray-600">
              Flexible loan solutions with competitive rates and transparent terms.
            </p>
          </div>

          {/* Loan Types */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {loanTypes.map((loan, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">{loan.title}</CardTitle>
                  <div className="space-y-2">
                    <Badge className="gradient-gold text-white">{loan.rate}</Badge>
                    <p className="text-sm text-gray-600">{loan.requirement}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{loan.description}</p>
                  <ul className="space-y-2">
                    {loan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Repayment Terms */}
          <div className="bg-white rounded-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Loan Repayment Terms
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {repaymentTerms.map((term, index) => (
                <div key={index} className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{term.period}</h4>
                  <div className="text-2xl font-bold text-blue-600 mb-2">{term.interest}</div>
                  <p className="text-sm text-gray-600">{term.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> Additional administrative fees may apply depending on the agreement. 
                Repayment schedule can be weekly or monthly based on your preference.
              </p>
            </div>
          </div>

          {/* Eligibility Requirements */}
          <div className="bg-white rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Eligibility Requirements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {eligibilityRequirements.map((requirement, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">{requirement}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Financial Consultancy Services */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Financial Consultancy Services
            </h2>
            <p className="text-lg text-gray-600">
              Expert financial guidance to help you make informed decisions and achieve your financial goals.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {consultancyServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">{service.title}</CardTitle>
                  <p className="text-gray-600">{service.description}</p>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold text-gray-900 mb-3">Key Benefits:</h4>
                  <ul className="space-y-2">
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <span className="text-blue-500 mr-2">→</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Client Benefits */}
          <div className="bg-blue-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Why Choose Our Consultancy Services?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-4xl mb-3">🎯</div>
                <h4 className="font-semibold text-gray-900 mb-2">Tailored Advice</h4>
                <p className="text-sm text-gray-600">Get personalized financial strategies</p>
              </div>
              <div>
                <div className="text-4xl mb-3">📈</div>
                <h4 className="font-semibold text-gray-900 mb-2">Improve Credit</h4>
                <p className="text-sm text-gray-600">Build better credit and savings habits</p>
              </div>
              <div>
                <div className="text-4xl mb-3">💪</div>
                <h4 className="font-semibold text-gray-900 mb-2">Control Debt</h4>
                <p className="text-sm text-gray-600">Gain control over your financial obligations</p>
              </div>
              <div>
                <div className="text-4xl mb-3">🧠</div>
                <h4 className="font-semibold text-gray-900 mb-2">Money Management</h4>
                <p className="text-sm text-gray-600">Learn effective financial management</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-white rounded-lg p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Start Your Financial Journey?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your specific needs and learn how our services can help you achieve your financial goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gradient-gold text-white hover:opacity-90" asChild>
              <Link to="/contact">Apply Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="gradient-navy text-white hover:opacity-90" asChild>
              <Link to="/contact">Schedule Consultation</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ServicesPage;
