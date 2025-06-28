import { FaArrowRightLong } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const macbook = {
  title: 'Apple MacBook',
  price: 1799,
  stock: 15,
  reviews: [],
  brand: 'Apple',
  category: 'laptop',
  photos: [],
  displayImage:
    'https://res.cloudinary.com/dzqkcbgew/image/upload/v1710929254/20211110_1636549088_550946-removebg-preview_nluykh.png',
  description:
    "The Apple MacBook Pro with M1 Chip is a revolutionary laptop that redefines performance and efficiency. With its powerful M1 chip, this laptop delivers blazing-fast performance for everyday tasks and demanding workflows alike. The stunning Retina display brings your content to life with vibrant colors and sharp detail, while the long battery life ensures that you can work and play all day without needing to recharge. Whether you're editing photos, coding software, or streaming movies, the Apple MacBook Pro with M1 Chip is the ultimate tool for creativity and productivity.",
  vendor: '65def92c87236f3b5c762222',
  runningDiscount: 0,
  releaseDate: '2024-03-10',
};

const Macbook = () => {
  const navigate = useNavigate();
  return (
    <div
      className="mt-14 lg:mt-20 bg-[#FFE7D6] p-6 pt-8 pb-0 md:py-8 lg:pt-2 lg:pb-1 lg:px-16 flex flex-col md:flex-row justify-between items-center space-y-4 rounded-md"
      data-aos="zoom-in"
      data-aos-duration="1500"
    >
      {/* description */}
      <div>
        <button className="bg-deep-bluish text-white py-1 px-3 rounded-sm text-center text-sm">
          save upto $230
        </button>
        <p className="my-4 text-custom-black text-2xl lg:text-5xl font-bold">
          {macbook?.title}
        </p>
        <p className="my-4 text-custom-black lg:text-lg font-thin w-full md:w-10/12 lg:w-8/12">
          {macbook?.description.slice(0, 150)}
        </p>
        <button
          className="bg-orange py-2 lg:py-2.5 px-3 lg:px-6 rounded text-white font-normal lg:font-semibold flex items-center gap-x-2 hover:bg-orange-500 lg:mt-6"
          onClick={() => navigate('/shop')}
        >
          Shop Now <FaArrowRightLong />
        </button>
      </div>
      {/* image */}
      <div>
        <img
          src={macbook?.displayImage}
          alt={macbook?.title}
          className="object-contain h-56 w-56 lg:h-80 lg:w-80 md:scale-150 lg:scale-100 md:-ml-10 lg:ml-0"
        />
      </div>
    </div>
  );
};

export default Macbook;
