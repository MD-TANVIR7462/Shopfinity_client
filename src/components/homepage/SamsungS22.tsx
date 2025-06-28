import { FaArrowRightLong } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const s22 = {
  title: 'Galaxy S22 Ultra',
  price: 1199,
  stock: 20,
  reviews: [],
  brand: 'Samsung',
  category: 'smartphone',
  photos: [],
  displayImage:
    'https://res.cloudinary.com/dzqkcbgew/image/upload/v1710831265/galaxy_irbdnu.png',
  description:
    "The Samsung Galaxy S22 Ultra is a premium smartphone that offers the perfect combination of power, performance, and versatility. With its stunning Infinity-O display and advanced camera system, this phone lets you capture every moment with stunning clarity and detail. The powerful Exynos processor and ample RAM ensure smooth multitasking and responsive performance, while the long-lasting battery keeps you connected all day long. Whether you're gaming, streaming, or just browsing the web, the Samsung Galaxy S22 Ultra is the perfect companion for your digital lifestyle.",
  vendor: '65def92c87236f3b5c762222',
  runningDiscount: 0,
  releaseDate: '2024-03-10',
};

const SamsungS22 = () => {
  const navigate = useNavigate();
  return (
    <div
      className="mt-14 lg:mt-20 bg-[#FFE7D6] p-6 pb-0 lg:px-16 lg:pt-12 lg:pb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 space-y-4 rounded-md md:items-center lg:items-start"
      data-aos="zoom-in"
      data-aos-duration="1500"
    >
      {/* image */}
      <div className="cols-span-12 lg:col-span-6">
        <img
          src={s22?.displayImage}
          alt={s22?.title}
          className="object-contain h-44 lg:h-60 w-44 lg:w-60 mb-10 mx-auto lg:mx-0"
        />
      </div>
      {/* description */}
      <div className="cols-span-12 lg:col-span-6 pb-6">
        <button className="bg-deep-bluish text-white py-1 px-3 rounded-sm text-center text-sm">
          save upto $99
        </button>
        <p className="my-4 text-custom-black text-2xl lg:text-5xl font-bold">
          {s22?.title}
        </p>
        <p className="my-4 text-custom-black lg:text-lg font-thin w-full">
          {s22?.description.slice(0, 120)}
        </p>
        <button
          className="bg-orange py-2 lg:py-2.5 px-3 lg:px-6 rounded text-white font-normal lg:font-semibold flex items-center gap-x-2 hover:bg-orange-500 lg:mt-6"
          onClick={() => navigate('/shop')}
        >
          Shop Now <FaArrowRightLong />
        </button>
      </div>
    </div>
  );
};

export default SamsungS22;
