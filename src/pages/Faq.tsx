import Testimonials from "@/components/homepage/Review";
import ScrollToTop from "@/components/ui/ToTop";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";
import {
  FaHeadset,
  FaShieldAlt,
  FaRocket,
  FaStar,
  FaSearch,
  FaShippingFast,
  FaUndoAlt,
  FaUserShield,
  FaQuestionCircle,
} from "react-icons/fa";
import { toast } from "sonner";

const faqs = [
  { id: 1, question: "How can I track my order?", answer: "Once your order is shipped, a confirmation email with a tracking number is sent." },
  { id: 2, question: "What payment methods do you accept?", answer: "Visa, Mastercard, American Express, PayPal, and Apple Pay are accepted." },
  { id: 3, question: "What is your return policy?", answer: "Returns are accepted within 30 days. Some conditions may apply." },
  { id: 4, question: "How long does shipping take?", answer: "Typically 3–5 business days for domestic orders." },
  { id: 5, question: "Do you offer international shipping?", answer: "Yes, international shipping is available with varying delivery times." },
  { id: 6, question: "Can I change or cancel my order?", answer: "If your order hasn't shipped yet, contact support to modify or cancel it." },
  { id: 7, question: "Is shopping on your site secure?", answer: "Yes, we use SSL encryption and secure payment gateways for your safety." },
  { id: 8, question: "Will I receive a receipt?", answer: "A receipt is automatically sent to your email after a successful order." },
  { id: 9, question: "Do you offer gift wrapping?", answer: "Yes, you can select gift wrapping at checkout for eligible products." },
  { id: 10, question: "How can I contact support?", answer: "You can use the form below or email us directly at support@example.com." },
];

const Faq = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  const handleQuestionSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.error("This feature is not available yet. Please try again later.", {
      position: "top-right",
      duration: 1500,
      icon: "🚫",
    });
    setEmail("");
    setSubject("");
    setMessage("");
  };

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="main-container mt-8 lg:mt-14 pb-20 space-y-20">

        {/* Hero Section */}
        <section className="text-center bg-gradient-to-br from-gray-100 to-green-100/30 p-10 rounded-xl shadow-md">
          <h1 className="text-4xl font-bold text-custom-black mb-4">Need Help? We’ve Got You Covered</h1>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Browse FAQs or reach out to our dedicated support team. We're here to help!
          </p>
          <div className="flex items-center border border-gray-300 rounded-full bg-white max-w-lg mx-auto px-4 py-2 shadow-sm focus-within:ring-2 ring-green-400">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              className="w-full pl-3 pr-2 py-1 outline-none bg-transparent"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </section>



        {/* FAQ & Contact Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* FAQs */}
          <div>
            <h2 className="text-2xl font-semibold text-custom-black mb-5">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible>
              {(search ? filteredFaqs : faqs).map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id.toString()}
                  className="mb-3 border border-gray-200 rounded-md"
                >
                  <AccordionTrigger className="font-medium text-black px-3 pb-3">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600 px-3 pb-3">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Contact Form */}
          <div className="from-gray-100 bg-gradient-to-br to-green-100/30 p-6 rounded-lg shadow-md h-fit">
            <h3 className="text-xl font-semibold text-custom-black mb-2">Still Need Help?</h3>
            <p className="text-sm text-gray-600 mb-4">Send us a message and we’ll respond within 24 hours.</p>
            <form onSubmit={handleQuestionSubmission} className="space-y-4">
              <input
                type="email"
                className="bg-white border px-4 py-2 rounded-md w-full text-black focus:ring-2 ring-green-300"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                className="bg-white border px-4 py-2 rounded-md w-full text-black focus:ring-2 ring-green-300"
                placeholder="Subject"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <textarea
                rows={4}
                className="bg-white border px-4 py-2 rounded-md w-full text-black focus:ring-2 ring-green-300"
                placeholder="Message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                type="submit"
                className="bg-orange hover:bg-green-700 transition text-white py-2 px-5 rounded-md uppercase font-medium"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>

        {/* New Section: Helpful Resources */}
        <section className="bg-white rounded-xl p-10 shadow-md space-y-6">
          <h2 className="text-2xl font-bold text-custom-black text-center">Helpful Resources</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: <FaShippingFast />, title: "Shipping Info" },
              { icon: <FaUndoAlt />, title: "Returns & Refunds" },
              { icon: <FaUserShield />, title: "Privacy Policy" },
              { icon: <FaQuestionCircle />, title: "Help Center" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-5 bg-gray-100/60 transition rounded-lg flex flex-col items-center shadow-sm"
              >
                <div className="text-2xl text-green-600 mb-2">{item.icon}</div>
                <p className="text-custom-black font-medium">{item.title}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Testimonials */}
      <Testimonials />

    
    </>
  );
};

export default Faq;
