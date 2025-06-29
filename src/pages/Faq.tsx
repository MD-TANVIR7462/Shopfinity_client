import ScrollToTop from '@/components/ui/ToTop';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { toast } from 'sonner';

const faqs = [
  {
    id: 1,
    question: 'How can I track my order?',
    answer:
      "Once your order is processed and shipped, you will receive a confirmation email containing a tracking number. You can use this tracking number on our website's tracking page to monitor the status of your delivery.",
  },
  {
    id: 2,
    question: 'What payment methods do you accept?',
    answer:
      'We accept a variety of payment methods including credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay. All transactions are processed securely to ensure your financial information remains safe.',
  },
  {
    id: 3,
    question: 'What is your return policy?',
    answer:
      'We offer a hassle-free return policy within 30 days of receiving your order. If you are not satisfied with your purchase for any reason, simply contact our customer support team to initiate the return process. Please note that certain items may be subject to restocking fees or ineligible for return, so be sure to review our full return policy for details.',
  },
  {
    id: 4,
    question: 'How long does shipping take?',
    answer:
      'Shipping times vary depending on your location and the shipping method selected at checkout. Typically, orders are processed and shipped within 1-2 business days. Once shipped, domestic orders within the United States usually arrive within 3-5 business days, while international orders may take longer depending on customs clearance.',
  },
  {
    id: 5,
    question: 'Do you offer international shipping?',
    answer:
      'Yes, we offer international shipping to most countries worldwide. During checkout, you can select your country from the list of available options. Please note that international shipping rates and delivery times may vary depending on your location and any customs regulations in your country. Additionally, customers are responsible for any customs duties or taxes that may apply to their orders upon delivery.',
  },
  {
    id: 6,
    question: 'Can I change or cancel my order after it has been placed?',
    answer:
      'Once an order has been placed, it immediately begins processing for shipment. Therefore, we are unable to accommodate changes or cancellations after the order has been submitted. We recommend reviewing your order carefully before completing the purchase to ensure all details are correct.',
  },
  {
    id: 7,
    question: 'How do I contact customer support?',
    answer:
      'If you have any questions, concerns, or need assistance, our customer support team is here to help. You can reach us by email at support@example.com or by phone at 1-800-123-4567. Our representatives are available during business hours to assist you.',
  },
  {
    id: 8,
    question: 'Do you offer discounts for bulk purchases?',
    answer:
      'Yes, we offer discounts for bulk purchases on select items. If you are interested in making a bulk purchase, please contact our sales team at sales@example.com for more information and pricing options.',
  },
];

const Faq = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleQuestionSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.error('This feature is not available yet. Please try again later.', {
      position: 'top-right',
      duration: 1500,
      icon: '🚫',
    });
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div>
      <ScrollToTop />
      <div className="main-container mt-6 lg:mt-14 pb-6 lg:pb-10 grid grid-cols-1 md:grid-cols-12 min-h-screen">
        <div
          className="col-span-12 md:col-span-6"
          data-aos="fade-down"
          data-aos-duration="1500"
        >
          <h3 className="text-custom-black text-xl md:text-2xl lg:text-3xl font-semibold mb-4">
            Frequently Asked Questions
          </h3>
          <Accordion type="single" collapsible className="w-full">
            {faqs?.map(
              (faq: { id: number; question: string; answer: string }) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id.toString()}
                  className="border border-gray-100 py-1 px-3 mb-4 rounded-md"
                >
                  <AccordionTrigger className="">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="shadow-2xl">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              )
            )}
          </Accordion>
        </div>
        <div
          className="col-span-12 md:col-span-6"
          data-aos="fade-down"
          data-aos-duration="1500"
        >
          <div className="bg-offyellow w-full md:w-11/12 mx-auto p-6 mt-8 md:mt-0 md:p-5 lg:p-8 rounded-md">
            <h3 className="text-custom-black text-md lg:text-lg font-semibold mb-3">
              Didn't find your answer, Ask for support.
            </h3>
            <p className="text-sm text-graish mb-6">
              Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed
              molestie accumsan dui, non iaculis primis in faucibu raesent eget
              sem purus.
            </p>
            <form onSubmit={handleQuestionSubmission}>
              <input
                type="email"
                className="bg-white py-2 lg:py-3 px-2 lg:px-3 rounded-md w-full focus:outline-none focus:border-none text-custom-black relative"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                className="bg-white py-2 lg:py-3 px-2 lg:px-3 rounded-md w-full focus:outline-none focus:border-none text-custom-black relative my-3"
                placeholder="Your Subject"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <textarea
                rows={3}
                className="bg-white py-2 lg:py-3 px-2 lg:px-3 rounded-md w-full focus:outline-none focus:border-none text-custom-black relative"
                placeholder="Your Message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                className="bg-orange py-2 lg:py-3 px-4  mt-4 rounded-sm text-white text-md uppercase flex items-center gap-x-2 hover:bg-green-700"
                onClick={() => handleQuestionSubmission}
              >
                Send Message <FaArrowRightLong />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
