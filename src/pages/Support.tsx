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
  {
    id: 1,
    img: truckImg,
    title: 'Track Order',
  },
  {
    id: 2,
    img: creditCard,
    title: 'Payment Options',
  },
  {
    id: 3,
    img: lockopen,
    title: 'Return Policy',
  },
  {
    id: 4,
    img: notepad,
    title: 'Warranty',
  },
  {
    id: 5,
    img: stack,
    title: 'FAQs',
  },
  {
    id: 6,
    img: storefront,
    title: 'Store Locator',
  },
  {
    id: 7,
    img: user,
    title: 'My Account',
  },
  {
    id: 8,
    img: creditCard,
    title: 'My Account',
  },
];

const Support = () => {
  const [search, setSearch] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.error('This feature is not avilable yet!', {
      position: 'top-right',
      duration: 1500,
      icon: '🚧',
    });
    setSearch('');
  };

  return (
    <div className="mt-6 lg:mt-14">
      <ScrollToTop />
      {/* header Section */}
      <div className="border-b border-gray-200 pb-8">
        <div className="main-container">
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div
              className="col-span-12 md:col-span-6"
              data-aos="fade-down"
              data-aos-duration="1500"
            >
              <button className="bg-deep-yellow py-2 px-4 lg:px-4 rounded-sm text-custom-black font-medium text-sm mt-8 md:mt-0">
                Help Center
              </button>
              <h3 className="text-custom-black font-semibold text-2xl lg:text-3xl mt-2 lg:mt-5">
                How we can help you?
              </h3>
              <form className="relative mt-5" onSubmit={handleSearch}>
                <input
                  type="text"
                  className="py-4 lg:py-6 px-2 lg:px-3 rounded-sm w-full lg:w-9/12 border border-gray-200 focus:outline-none text-custom-black relative"
                  placeholder="Enter your question or keyword"
                  required
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-orange text-white absolute py-2 lg:py-3 px-2 lg:px-3 font-medium top-2 lg:top-3 right-2 lg:right-44 shadow-none min-w-20 lg:min-w-28 rounded-sm"
                >
                  Search
                </button>
              </form>
            </div>
            <div
              className="col-span-12 md:col-span-6 order-first md:order-last"
              data-aos="fade-down"
              data-aos-duration="1500"
            >
              <img
                src={supportImage}
                alt="support"
                className="w-full h-52 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
      {/* support category section */}
      <div className=" mt-8 lg:mt-20">
        <div className="main-container">
          <h3
            className="text-custom-black font-semibold text-2xl lg:text-3xl mt-5 text-center"
            data-aos="fade-down"
            data-aos-duration="1500"
          >
            What can we assist you with today?
          </h3>
          <div className="mt-5 lg:mt-10 grid grid-cols-12 md:grid-cols-12 gap-x-6 gap-y-8">
            {supportOptions.map(
              (option: { id: number; img: string; title: string }) => (
                <div
                  key={option.id}
                  className="col-span-12 md:col-span-4 lg:col-span-3 border border-orange-200 p-5 lg:p-6 rounded-md"
                  data-aos="fade-down"
                  data-aos-duration="1500"
                >
                  <div className="flex justify-start items-center space-x-3">
                    <img
                      src={option.img}
                      alt={option.title}
                      className="w-6 h-6 object-contain"
                    />
                    <p className="text-custom-black font-semibold">
                      {option.title}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      {/* contact us section */}
      <div className="mt-8 lg:mt-20 py-10 lg:py-20 bg-offwhite">
        <div className="main-container">
          <div
            className="text-center"
            data-aos="fade-down"
            data-aos-duration="1500"
          >
            <button className="bg-deep-bluish text-white py-2 px-4 lg:px-4 rounded-sm font-medium text-sm">
              Contact Us
            </button>
            <h3 className="text-custom-black font-semibold text-2xl lg:text-3xl mt-3 text-center">
              Didn't find your answer. <br />
              Contact with us
            </h3>
          </div>
          {/* cards */}
          <div className="grid grid-cols-1 md:grid-cols-12 mt-5 lg:mt-10 md:space-x-6 space-y-4 md:space-y-0 lg:px-32">
            {/* call */}
            <div
              className="bg-white p-8 rounded-sm col-span-12 md:col-span-6 grid grid-cols-12 justify-items-start gap-x-4"
              data-aos="fade-down"
              data-aos-duration="1500"
            >
              <div className="col-span-12 md:col-span-3">
                <div className="bg-[rgba(45,165,243,.3)] p-3 lg:p-6 flex justify-start items-center rounded mb-4 md:mb-0">
                  <img
                    src={callus}
                    alt="call"
                    className="w-10 h-10 object-contain"
                  />
                </div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <h5 className="text-custom-black font-semibold text-lg mb-2">
                  Call Us Now
                </h5>
                <p className="text-pure-gray text-sm ">
                  we are available online from 9:00 AM to 5:00 PM (GMT +6hrs)
                  Talk with use now
                </p>
                <h6 className="text-gray-500 font-semibold mt-4">
                  +880-1998-863753
                </h6>
                <button className="bg-[rgba(45,165,243,1)] text-white py-1.5 md:py-2 lg:py-3 px-2 lg:px-8 rounded font-medium mt-6 flex items-center gap-x-1 md:gap-x-2">
                  Call Now <FaArrowRightLong />
                </button>
              </div>
            </div>
            {/* chat */}
            <div
              className="bg-white p-8 rounded-sm col-span-12 md:col-span-6 grid grid-cols-12 justify-items-start gap-x-4"
              data-aos="fade-down"
              data-aos-duration="1500"
            >
              <div className="col-span-12 md:col-span-3">
                <div className="bg-[rgba(45,178,36,.3)] p-3 lg:p-6 flex justify-start items-center rounded mb-4 md:mb-0">
                  <img
                    src={emailus}
                    alt="call"
                    className="w-10 h-10 object-contain"
                  />
                </div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <h5 className="text-custom-black font-semibold text-lg mb-2">
                  Chat With Us
                </h5>
                <p className="text-pure-gray text-sm ">
                  we are available online from 9:00 AM to 5:00 PM (GMT +6hrs)
                  Talk with use now
                </p>
                <h6 className="text-gray-500 font-semibold mt-4">
                  babulakterfsd@gmail.com
                </h6>
                <button className="bg-[rgba(45,178,36,1)] text-white py-1.5 md:py-2 lg:py-3 px-2 lg:px-8 rounded font-medium mt-6 flex items-center gap-x-1 md:gap-x-2">
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
