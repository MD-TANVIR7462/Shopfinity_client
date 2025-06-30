import ScrollToTop from '@/components/ui/ToTop';
import { useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { toast } from 'sonner';
import emailus from '../assets/images/ChatCircleDotss.png';
import callus from '../assets/images/PhoneCall.png';
import supportImage from '../assets/images/support.svg';
import creditCard from '../assets/images/support/CreditCard.png';
import lockopen from '../assets/images/support/LockOpen.png';
import notepad from '../assets/images/support/Notepad.png';
import stack from '../assets/images/support/Stack.png';
import storefront from '../assets/images/support/Storefront.png';
import truckImg from '../assets/images/support/Truck.png';
import user from '../assets/images/support/User.png';

const supportOptions = [
  { id: 1, img: truckImg, title: 'Track Order' },
  { id: 2, img: creditCard, title: 'Payment Options' },
  { id: 3, img: lockopen, title: 'Return Policy' },
  { id: 4, img: notepad, title: 'Warranty' },
  { id: 5, img: stack, title: 'FAQs' },
  { id: 6, img: storefront, title: 'Store Locator' },
  { id: 7, img: user, title: 'My Account' },
  { id: 8, img: creditCard, title: 'Billing Info' },
];

const popularTopics = [
  'Track My Package',
  'Cancel My Order',
  'Change Shipping Address',
  'Payment Failed',
  'How to Use Coupons',
  'Refund Status',
  'Account Login Issues',
  'Membership Benefits',
];

const Support = () => {
  const [search, setSearch] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.error('This feature is not available yet!', {
      position: 'top-right',
      duration: 1500,
      icon: '🚧',
    });
    setSearch('');
  };

  return (
    <div className="mt-6 lg:mt-14">
      {/* Hero Section */}
      <div className="border-b border-gray-200 pb-10 bg-gradient-to-br from-green-50 to-white">
        <div className="main-container grid grid-cols-1 md:grid-cols-12 items-center gap-10">
          <div className="md:col-span-6">
            <button className="bg-deep-yellow py-2 px-5 rounded text-sm font-semibold text-custom-black mb-3">
              Help Center
            </button>
            <h1 className="text-3xl lg:text-4xl font-bold text-custom-black mb-4">
              How can we help you today?
            </h1>
            <form onSubmit={handleSearch} className="relative max-w-xl">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search support topics..."
                className="w-full px-4 py-4 rounded border border-gray-300 shadow-sm focus:ring-2 focus:ring-orange outline-none"
              />
              <button
                type="submit"
                className="absolute top-2 right-2 bg-orange text-white px-5 py-2 rounded font-medium"
              >
                Search
              </button>
            </form>
          </div>
          <div className="md:col-span-6">
            <img src={supportImage} alt="Support" className="w-full h-auto" />
          </div>
        </div>
      </div>

      {/* Popular Topics */}
      <div className="main-container mt-16">
        <h2 className="text-2xl font-bold text-custom-black mb-6 text-center">
          Popular Help Topics
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {popularTopics.map((topic, i) => (
            <div
              key={i}
              className="bg-white border hover:shadow-lg p-4 rounded text-center text-sm text-gray-700 font-medium cursor-pointer transition"
            >
              {topic}
            </div>
          ))}
        </div>
      </div>

      {/* Support Categories */}
      <div className="main-container mt-20">
        <h2 className="text-2xl font-bold text-custom-black mb-6 text-center">
          What can we assist you with?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {supportOptions.map(({ id, img, title }) => (
            <div
              key={id}
              className="bg-white border border-orange-200 p-6 rounded-md hover:shadow-md transition"
            >
              <div className="flex items-center space-x-4">
                <img src={img} alt={title} className="w-8 h-8" />
                <p className="text-custom-black font-semibold">{title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Cards Section */}
      <div className="mt-20 py-20 bg-offwhite">
        <div className="main-container text-center">
          <button className="bg-deep-bluish text-white py-2 px-5 rounded font-medium text-sm">
            Contact Us
          </button>
          <h2 className="text-3xl font-bold text-custom-black mt-4">
            Didn't find what you're looking for?
          </h2>
          <p className="text-gray-600 mt-2">
            Our support team is here to help you 24/7
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {/* Call Card */}
            <div className="bg-white p-8 rounded shadow-md flex items-start gap-4">
              <div className="bg-blue-100 p-4 rounded">
                <img src={callus} alt="Call us" className="w-10 h-10" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-custom-black">Call Us</h3>
                <p className="text-sm text-gray-600">
                  Available 9:00 AM to 5:00 PM (GMT +6)
                </p>
                <p className="text-gray-700 font-semibold mt-2">
                  +880-1998-863753
                </p>
                <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded flex items-center gap-2">
                  Call Now <FaArrowRightLong />
                </button>
              </div>
            </div>

            {/* Chat Card */}
            <div className="bg-white p-8 rounded shadow-md flex items-start gap-4">
              <div className="bg-green-100 p-4 rounded">
                <img src={emailus} alt="Email us" className="w-10 h-10" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-custom-black">Chat With Us</h3>
                <p className="text-sm text-gray-600">
                  We're online and ready to assist!
                </p>
                <p className="text-gray-700 font-semibold mt-2">
                  mdtanvir7462@gmail.com
                </p>
                <button className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded flex items-center gap-2">
                  Contact Us <FaArrowRightLong />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
