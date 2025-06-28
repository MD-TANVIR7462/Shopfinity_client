import CoreTeamMember from '@/components/about/CoreTeamMember';
import Collections from '@/components/homepage/Collections';
import Newsletter from '@/components/homepage/Newsletter';
import ScrollToTop from '@/components/ui/ToTop';
import { useGetProductsQuery } from '@/redux/api/productApi';
import buttonimg from '../assets/images/about/Button.png';
import greenCheck from '../assets/images/about/Checks.svg';
import aboutusImg from '../assets/images/about/about-header.png';
import Styles from '../styles/aboutus.module.css';

const AboutUs = () => {
  const { data, isLoading } = useGetProductsQuery(undefined);
  const products = data?.data?.data;

  return (
    <div className="md:mt-8 lg:mt-14">
      <ScrollToTop />
      {/* About Us Header */}
      <div className="md:border-b border-gray-200 md:pb-8 lg:pb-12">
        <div className="main-container">
          <div className="grid grid-cols-1 md:grid-cols-12 md:gap-x-6 gap-y-6 md:gap-y-0">
            <div
              className="col-span-12 md:col-span-6"
              data-aos="fade-down"
              data-aos-duration="1500"
            >
              <button className="bg-deep-bluish text-white py-2 px-4 lg:px-4 rounded-sm font-medium text-sm mt-8 md:mt-0">
                Who We Are
              </button>
              <h3 className="text-custom-black text-2xl lg:text-4xl font-semibold mt-3 lg:w-10/12">
                GizmoBuy - largest electronics retail shop in the world.
              </h3>
              <p className="mt-2 lg:mt-4 text-pure-gray lg:w-11/12">
                Pellentesque ultrices, dui vel hendrerit iaculis, ipsum velit
                vestibulum risus, ac tincidunt diam lectus id magna. Praesent
                maximus lobortis neque sit amet rhoncus. Nullam tempus lectus a
                dui aliquet, non ultricies nibh elementum. Nulla ac nulla dolor.{' '}
              </p>
              <div className="flex flex-col space-y-3 lg:space-y-4 mt-4 lg:mt-8">
                <div className="flex items-center space-x-2">
                  <img
                    src={greenCheck}
                    alt="check"
                    className="w-6 h-6 object-contain"
                  />
                  <span className="text-custom-black">
                    Great 24/7 customer services.
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <img
                    src={greenCheck}
                    alt="check"
                    className="w-6 h-6 object-contain"
                  />
                  <span className="text-custom-black">
                    600+ Dedicated employe.
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <img
                    src={greenCheck}
                    alt="check"
                    className="w-6 h-6 object-contain"
                  />
                  <span className="text-custom-black">
                    50+ Branches all over the world.
                  </span>
                </div>
                <div className="flex items-center space-x-2 md:hidden">
                  <img
                    src={greenCheck}
                    alt="check"
                    className="w-6 h-6 object-contain"
                  />
                  <span className="text-custom-black">
                    Over 1 Million Electronics Products
                  </span>
                </div>
              </div>
            </div>
            <div
              className="col-span-12 md:col-span-6"
              data-aos="fade-down"
              data-aos-duration="1500"
            >
              <img
                src={aboutusImg}
                alt="About Us"
                className="w-full h-96 object-contain -mt-10 md:mt-0"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Core Team Member */}
      <CoreTeamMember />
      {/* About banner */}
      <div
        className="mt-8 lg:mt-20 hidden lg:block"
        data-aos="fade-down"
        data-aos-duration="1500"
      >
        <div className={`${Styles.bannerbg} py-6 h-72`}>
          <div className="main-container">
            <h3 className="text-custom-black font-semibold text-2xl lg:text-3xl mt-5 ">
              Your trusted and reliable <br /> ecommerce partner.
            </h3>
            <p className="w-2/5 text-pure-gray mt-3">
              Praesent sed semper metus. Nunc aliquet dolor mauris, et fringilla
              elit gravida eget. Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Laborum repellendus voluptate excepturi! Autem
              deleniti quam, ducimus minima dignissimos reiciendis iste
              molestiae placeat perspiciatis deserunt facere.
            </p>
            <img
              src={buttonimg}
              alt="button"
              className="w-32 h-10 object-contain mt-6 lg:-ml-12 hidden"
            />
          </div>
        </div>
      </div>
      <div className="main-container mb-16">
        {!isLoading && <Collections products={products} />}
      </div>
      <Newsletter />
    </div>
  );
};

export default AboutUs;
