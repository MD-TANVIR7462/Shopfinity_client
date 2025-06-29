import { useState } from 'react';
import amazon from '../../assets/images/Frame.png';
import google from '../../assets/images/google-2015 1.png';
import philips from '../../assets/images/philips 1.png';
import samsung from '../../assets/images/samsung-4 1.png';
import toshiba from '../../assets/images/toshiba-1 1.png';

const Newsletter = () => {
  const [emailToBeSubscribed, setEmailToBeSubscribed] = useState('');

  const handleEmailSubscription = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailToBeSubscribed('');
  };

  return (
    <div
      className="bg-bluish pt-10 lg:pt-16 pb-5 lg:pb-10 flex justify-center items-center flex-col"
    
    >
      <h4 className="text-xl lg:text-3xl font-semibold text-white text-center lg:text-left">
        Subscribe to our newsletter
      </h4>
      <p className="text-gray-200 text-sm w-full md:w-3/4 lg:w-1/3 text-center my-3">
        Praesent fringilla erat a lacinia egestas. Donec vehicula tempor libero
        et cursus. Donec non quam urna. Quisque vitae porta ipsum.
      </p>
      <div className="mt-4">
        <form className="relative" onSubmit={handleEmailSubscription}>
          <input
            type="email"
            className="bg-white py-2 lg:py-4 px-2 lg:px-3 rounded-sm w-[300px] md:w-96 lg:w-[500px] focus:outline-none focus:border-none text-custom-black relative"
            placeholder="e.g. babulakterfsd@gmail.com"
            required
            value={emailToBeSubscribed}
            onChange={(e) => setEmailToBeSubscribed(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-500 text-white absolute right-0 py-2 lg:py-4 px-2 lg:px-3 font-semibold lg:font-bold"
          >
            Subscribe
          </button>
        </form>
      </div>
      <div className="h-[.1px] w-1/4 bg-green-500 mt-8"></div>
      <div className="flex justify-between items-center space-x-4 lg:space-x-8">
        <img
          src={amazon}
          alt="Amazon"
          className="w-14 lg:w-16 h-auto object-contain"
        />
        <img
          src={google}
          alt="Google"
          className="w-14 lg:w-16 h-auto object-contain"
        />
        <img
          src={philips}
          alt="Philips"
          className="w-14 lg:w-16 h-auto object-contain"
        />
        <img
          src={samsung}
          alt="Samsung"
          className="w-14 lg:w-16 h-auto object-contain hidden lg:inline-block"
        />
        <img
          src={toshiba}
          alt="Toshiba"
          className="w-14 lg:w-16 h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default Newsletter;
