import { FaTruck, FaUndo, FaShieldAlt, FaHeadset } from 'react-icons/fa';

const WhyChooseUs = () => {
  return (
    <section className="bg-[#f5f7faa8] py-16 mt-7">
      <div className="main-container text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Why Choose <span className="text-[#528b30]">Shopinity?</span>
        </h2>
        <p className="text-gray-500 mb-10 max-w-xl mx-auto">
          We go the extra mile to ensure your online shopping experience is seamless, secure, and satisfying.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <FaTruck className="text-4xl text-[#528b30] mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2">Fast & Free Delivery</h4>
            <p className="text-gray-600 text-sm">We deliver quickly and free on orders over $50.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <FaUndo className="text-4xl text-[#528b30] mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2">Easy Returns</h4>
            <p className="text-gray-600 text-sm">Hassle-free 7-day return policy on all orders.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <FaShieldAlt className="text-4xl text-[#528b30] mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2">Secure Payments</h4>
            <p className="text-gray-600 text-sm">Your payment info is protected with industry-grade encryption.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <FaHeadset className="text-4xl text-[#528b30] mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2">24/7 Support</h4>
            <p className="text-gray-600 text-sm">Our team is always here to help with any questions.</p>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default WhyChooseUs;
