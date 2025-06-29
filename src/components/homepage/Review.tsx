import { FaStar } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Emily Johnson',
    role: 'Tech Enthusiast',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: 'Shopinity exceeded my expectations! Fast delivery, great prices, and outstanding customer service.',
    stars: 5,
  },
  {
    name: 'Mark Williams',
    role: 'Photographer',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    text: 'I love the quality of products and how smooth everything was. I’ll be shopping again for sure!',
    stars: 5,
  },
  {
    name: 'Sophia Lee',
    role: 'Designer',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    text: 'Super clean UI, awesome product range, and fast shipping. Highly recommended!',
    stars: 4,
  },
];

const Testimonials = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-[#f5f5f5] via-white to-[#f0fdf4] mt-7">
      <div className="main-container text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Loved by Thousands of <span className="text-[#3b841e]">Happy Customers</span>
        </h2>
        <p className="text-gray-500 mb-12 max-w-xl mx-auto">
          Here’s what our real customers are saying about their Shopinity experience.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#3b841e]"
                />
                <div className="text-left">
                  <h4 className="text-sm font-semibold text-gray-800">{t.name}</h4>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">“{t.text}”</p>
              <div className="flex gap-1 text-yellow-400">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <FaStar key={i} size={16} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
