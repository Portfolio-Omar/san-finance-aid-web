
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqData = [
  {
    question: "How fast can I get approved for a loan?",
    answer: "Most applications are processed within 24-48 hours after submission of all required documents. For high corporate loans, the process may take 3-5 business days due to additional verification requirements."
  },
  {
    question: "What documents do I need to apply?",
    answer: "You'll need valid government-issued ID, completed loan application form, proof of income or business revenue, bank statements (last 3 months), and appropriate security or debentures based on loan type. Additional documents may be required for business loans."
  },
  {
    question: "Are there any hidden fees?",
    answer: "No hidden fees whatsoever. All costs including interest rates, administrative fees, and any applicable charges are clearly outlined in your loan agreement before signing. We believe in complete transparency."
  },
  {
    question: "Can I repay my loan early?",
    answer: "Yes, early repayment is allowed and encouraged. Early repayment may reduce your total interest costs. Contact us to discuss early settlement options and any applicable terms."
  },
  {
    question: "What are the interest rates for different loan types?",
    answer: "Personal loans: 37% monthly, Business loans: 40% monthly, High Corporate loans: 27% monthly. Repayment terms vary from 1 week (15% interest) to 1 month (37% interest). Rates may vary based on loan amount and creditworthiness."
  },
  {
    question: "What collateral is required?",
    answer: "Personal and business loans require appropriate collateral as security. High corporate loans are secured via debentures. The type and value of collateral depends on the loan amount and type. Our team will guide you through the collateral requirements."
  },
  {
    question: "Do you offer financial consultation services?",
    answer: "Yes! We provide comprehensive financial consultancy including financial planning, debt management, personalized budgeting, and credit counseling. Our experts help you make informed financial decisions and achieve your goals."
  },
  {
    question: "How do I contact customer support?",
    answer: "You can reach us via WhatsApp/Phone at +260 773507707, email us at sanfinance2023@gmail.com, or connect with us on Facebook and Instagram. We provide 24/7 online support for all inquiries."
  },
  {
    question: "Is my personal information secure?",
    answer: "Absolutely. We use industry-standard security measures to protect your personal and financial information. Your data is encrypted and never shared with third parties without your explicit consent."
  },
  {
    question: "Can I apply if I have bad credit?",
    answer: "We evaluate each application individually. While credit history is considered, we also look at your current financial situation, ability to repay, and the collateral provided. Contact us to discuss your specific situation."
  }
];

export const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Get answers to common questions about our financial services.
          </p>
        </div>
        
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-0">
                <button
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-accent transition-colors"
                  onClick={() => toggleItem(index)}
                >
                  <h3 className="text-lg font-semibold text-foreground pr-4">
                    {faq.question}
                  </h3>
                  {openItems.includes(index) ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>
                
                {openItems.includes(index) && (
                  <div className="px-6 pb-6 animate-fade-in">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
