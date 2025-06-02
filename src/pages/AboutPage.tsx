
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Andrew Shota Daka',
      position: 'Founder & Managing Director',
      profession: 'Economist',
      bio: 'Andrew is an economist by profession and the visionary founder of SAN Finance. Since establishing the company in 2023, he has guided it to serve over 100 clients and engage in financial literacy community projects. He is committed to building SAN Finance\'s reputation — and Africa\'s name — on the global financial stage.',
      icon: '👨‍💼'
    },
    {
      name: 'Richard Solomon Njovu',
      position: 'Deputy Managing Director',
      profession: 'Accountant',
      bio: 'Richard is an accountant by profession who previously served as the Company Accountant before being promoted to Deputy Managing Director. He brings strategic oversight and support to the Managing Director, helping to drive SAN Finance\'s mission of financial empowerment and sustainable growth.',
      icon: '👨‍💼'
    },
    {
      name: 'Mofya Beatrice Kabeka',
      position: 'Company Secretary & Head of Marketing',
      profession: 'Development Studies Student',
      bio: 'I am the Company Secretary and Head of Marketing at SAN Finance. I am currently pursuing a degree in Development Studies at the University of Zambia. With a background in credit control, loan management, financial planning, and customer service, I focus on promoting responsible borrowing and contributing to SAN Finance\'s growth.',
      icon: '👩‍💼'
    },
    {
      name: 'Faith Kaniki',
      position: 'Company Accountant',
      profession: 'Economist',
      bio: 'Faith is an economist by profession and serves as the Company Accountant at SAN Finance. She ensures the accuracy and compliance of financial records, supporting SAN Finance\'s integrity and sustainability.',
      icon: '👩‍💼'
    }
  ];

  const values = [
    {
      title: 'Integrity',
      description: 'We uphold honesty and transparency in all our dealings.',
      icon: '🤝'
    },
    {
      title: 'Responsibility',
      description: 'We lend responsibly and educate our clients about smart financial management.',
      icon: '🛡️'
    },
    {
      title: 'Innovation',
      description: 'We continually improve our services to meet our clients\' evolving needs.',
      icon: '💡'
    },
    {
      title: 'Customer Focus',
      description: 'We prioritize customer satisfaction and tailor our solutions to their unique situations.',
      icon: '👥'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative text-white py-20 lg:py-32 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url('/bg.jpg')"
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            About SAN Finance
          </h1>
          <p className="text-xl sm:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto animate-fade-in">
            Empowering Africa's financial future through integrity, innovation, and excellence.
          </p>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            {/* Mission */}
            <Card className="text-center animate-fade-in">
              <CardHeader>
                <div className="text-5xl mb-4">🎯</div>
                <CardTitle className="text-2xl text-foreground">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To empower individuals and businesses with accessible financial solutions that promote economic growth and stability.
                </p>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="text-center animate-fade-in">
              <CardHeader>
                <div className="text-5xl mb-4">🌍</div>
                <CardTitle className="text-2xl text-foreground">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To become Zambia's leading financial partner in sustainable lending and consultancy, and to pioneer Africa's name on the global financial stage.
                </p>
              </CardContent>
            </Card>

            {/* History */}
            <Card className="text-center animate-fade-in">
              <CardHeader>
                <div className="text-5xl mb-4">📈</div>
                <CardTitle className="text-2xl text-foreground">Our History</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Founded in 2023 by Andrew Shota Daka and registered with PACRA. We've served over 100 clients and actively participate in community financial literacy projects.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Core Values */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide everything we do at SAN Finance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 animate-fade-in">
                <CardHeader>
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <CardTitle className="text-xl text-foreground">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24 bg-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-muted-foreground">
              The dedicated professionals driving SAN Finance's mission forward.
            </p>
          </div>

          {/* Team Structure Overview */}
          <div className="mb-12 text-center">
            <h3 className="text-2xl font-semibold text-foreground mb-6">Organizational Structure</h3>
            <div className="flex flex-col items-center space-y-4 max-w-md mx-auto">
              <Badge className="gradient-gold text-white text-lg px-4 py-2">Managing Director</Badge>
              <div className="w-px h-8 bg-border"></div>
              <Badge className="gradient-blue text-white text-lg px-4 py-2">Deputy Managing Director</Badge>
              <div className="w-px h-8 bg-border"></div>
              <div className="flex space-x-4">
                <Badge variant="outline" className="border-gold text-foreground">Company Secretary & Marketing</Badge>
                <Badge variant="outline" className="border-san-blue text-foreground">Company Accountant</Badge>
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 animate-fade-in">
                <CardHeader className="text-center">
                  <div className="text-6xl mb-4">{member.icon}</div>
                  <CardTitle className="text-xl text-foreground">{member.name}</CardTitle>
                  <div className="space-y-2">
                    <Badge className="gradient-gold text-white">{member.position}</Badge>
                    <p className="text-sm text-muted-foreground">{member.profession}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-16 gradient-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Our Impact Since 2023
            </h2>
            <p className="text-xl text-blue-100">
              Making a difference in Zambia's financial landscape.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-4xl font-bold text-gold mb-2">100+</div>
              <p className="text-blue-100">Clients Served</p>
            </div>
            <div className="animate-fade-in">
              <div className="text-4xl font-bold text-gold mb-2">2023</div>
              <p className="text-blue-100">Year Established</p>
            </div>
            <div className="animate-fade-in">
              <div className="text-4xl font-bold text-gold mb-2">4</div>
              <p className="text-blue-100">Core Values</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
