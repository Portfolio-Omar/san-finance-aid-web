
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const WelcomePopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('san-finance-welcome-seen');
    
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);

      const autoHideTimer = setTimeout(() => {
        setIsVisible(false);
        localStorage.setItem('san-finance-welcome-seen', 'true');
      }, 11000);

      return () => {
        clearTimeout(timer);
        clearTimeout(autoHideTimer);
      };
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('san-finance-welcome-seen', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 animate-fade-in">
      <Card className="w-full max-w-md mx-auto animate-scale-in shadow-2xl">
        <CardContent className="p-6 text-center relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="absolute top-2 right-2 hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 gradient-gold rounded-full flex items-center justify-center animate-pulse">
              <span className="text-white font-bold text-2xl">💰</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome to SAN Finance!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              🌟 Your trusted financial partner is here! Get instant access to:
            </p>
            <div className="text-left space-y-2 mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                ✅ Quick loan approvals (24-48 hrs)
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                ✅ Competitive interest rates
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                ✅ Expert financial consultation
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                ✅ Transparent, no hidden fees
              </p>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button 
              className="w-full gradient-gold text-white hover:opacity-90" 
              asChild
              onClick={handleClose}
            >
              <Link to="/contact">Apply for Loan Now! 🚀</Link>
            </Button>
            <Button 
              variant="outline" 
              className="w-full" 
              asChild
              onClick={handleClose}
            >
              <Link to="/services">Explore Our Services</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
