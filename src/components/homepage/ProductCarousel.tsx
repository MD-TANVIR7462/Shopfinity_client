import { TProduct } from '@/types/commonTypes';
import { samsungWatch4, sonyHeadphone } from '@/utils/demoDataForHome';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { sliderData } from '../../utils/demoDataForHome';

const Carousel = () => {
  const navigate = useNavigate();
  const products = sliderData;
  SwiperCore.use([Autoplay]);

  return (
    <div className="banner grid grid-cols-1 lg:grid-cols-12 justify-items-center mt-6 lg:mt-10 gap-4">
      {/* carousel */}
      <div
        className="swipercontainer col-span-12 lg:col-span-8  main-container"
        data-aos="fade-down"
        data-aos-duration="1500"
      >
        <Swiper
          scrollbar
          navigation
          direction="horizontal"
          modules={[Pagination]}
          slidesPerView={1}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
        >
          {products?.map((product: TProduct) => (
            <SwiperSlide
              key={product?._id}
              className="grid grid-cols-1 lg:grid-cols-12 bg-offwhite rounded-md py-6 lg:py-16 px-4 lg:px-10 h-full lg:h-[450px]"
            >
              {/*product description*/}
              <div className="cols-span-12 lg:col-span-6 order-last lg:order-1">
                <h4 className="text-bluish font-semibold mb-1 text-sm">{`- ${product?.intro}`}</h4>
                <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-4 text-custom-black">
                  {product?.title}
                </h2>
                <p className="text-graish leading-5">
                  {product?.description.slice(0, 160)}
                </p>
                <div className="mt-6">
                  <button
                    className="bg-orange py-2 lg:py-2.5 px-3 lg:px-6 rounded text-white font-semibold flex items-center gap-x-2 hover:bg-orange-500"
                    onClick={() => navigate('/shop')}
                  >
                    Shop Now <FaArrowRightLong />
                  </button>
                </div>
              </div>
              {/*product image*/}
              <div className="cols-span-12 lg:col-span-4 order-2 lg:order-2">
                <img
                  src={product?.displayImage}
                  alt={product?.title}
                  className="h-44 lg:h-72 w-full object-contain mb-6 md:mb-0"
                />
              </div>
              {/*product price*/}
              <div className="cols-span-12 lg:col-span-2 order-first lg:order-3 ml-auto mb-4">
                <div className="h-10 md:h-16 w-10 md:w-16 p-6 rounded-full bg-deep-bluish flex justify-center items-center ml-8">
                  <p className="text-white font-bold text-sm md:text-base">{`$${product?.price}`}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* side products */}
      <div className="col-span-12 lg:col-span-4 flex flex-col md:flex-row lg:flex-col gap-y-4 gap-x-4">
        <div
          className="product-1 bg-custom-black rounded-md flex space-x-1 px-3 py-5"
          data-aos="fade-down"
          data-aos-duration="1500"
        >
          <div className="col-span-6 mt-4 lg:mt-9">
            <h4 className="text-yellow font-semibold mb-1 text-sm">
              summer sells
            </h4>
            <h2 className="text-2xl font-bold mb-4 text-white">
              {sonyHeadphone?.title}
            </h2>

            <div className="mt-4">
              <button
                className="bg-orange py-2 px-4 text-sm rounded text-white font-semibold flex items-center gap-x-2 hover:bg-orange-500"
                onClick={() => navigate('/shop')}
              >
                Shop Now <FaArrowRightLong />
              </button>
            </div>
          </div>
          <div className="col-span-6">
            <img
              src={sonyHeadphone?.displayImage}
              alt={sonyHeadphone?.title}
              className="object-contain w-44 h-44 "
            />
          </div>
        </div>
        {/* banner  for product 2*/}
        <div
          className="product-2 bg-offwhite rounded-md flex space-x-8 px-3 py-5 md:w-3/5 lg:w-full"
          data-aos="fade-down"
          data-aos-duration="1500"
        >
          <div className="col-span-6">
            <img
              src={samsungWatch4?.displayImage}
              alt={samsungWatch4?.title}
              className="object-contain w-44 h-44 "
            />
          </div>
          <div className="col-span-6 mt-6">
            <h2 className="text-2xl font-bold mb-4 text-custom-black">
              {samsungWatch4?.title}
            </h2>

            <div className="mt-4">
              <button
                className="bg-orange py-2 px-4 text-sm rounded text-white font-semibold flex items-center gap-x-2 hover:bg-orange-500"
                onClick={() => navigate('/shop')}
              >
                Shop Now <FaArrowRightLong />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
