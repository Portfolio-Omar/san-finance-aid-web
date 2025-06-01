
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const WhatsAppFloat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "+260773507707";

  const quickLinks = [
    {
      title: "Personal Loan Inquiry",
      message: "Hello SAN Finance! I'm interested in applying for a personal loan. Could you please provide me with more information about the requirements and interest rates?"
    },
    {
      title: "Business Loan Inquiry",
      message: "Hi SAN Finance! I would like to inquire about business loans for my company. Can you help me understand the application process and terms?"
    },
    {
      title: "Financial Consultation",
      message: "Hello! I'm looking for financial consultation services. Could you please tell me more about your advisory services and how to schedule a consultation?"
    },
    {
      title: "General Information",
      message: "Hi SAN Finance! I'm interested in learning more about your financial services. Could you provide me with general information?"
    }
  ];

  const handleWhatsAppClick = (message: string) => {
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* Quick Links Popup */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-40">
          <Card className="w-80 shadow-2xl animate-slide-in-right">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-green-600">Quick Actions</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-6 w-6 p-0"
                >
                  ×
                </Button>
              </div>
              <div className="space-y-2">
                {quickLinks.map((link, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start h-auto p-3 hover:bg-green-50 hover:border-green-200 transition-all"
                    onClick={() => handleWhatsAppClick(link.message)}
                  >
                    <div>
                      <div className="font-medium text-sm">{link.title}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* WhatsApp Button */}
      <div 
        className="fixed bottom-6 right-6 z-50 cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 group-hover:scale-110 animate-pulse">
          <svg 
            className="w-6 h-6" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.531 3.325"/>
          </svg>
        </div>
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Chat with us on WhatsApp
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>
      </div>
    </>
  );
};
