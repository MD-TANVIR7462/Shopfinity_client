import BestDeals from '@/components/homepage/BestDeals';
import Blog from '@/components/homepage/Blog';
import Collections from '@/components/homepage/Collections';
import FeatureSummary from '@/components/homepage/FeatureSummary';
import Macbook from '@/components/homepage/Macbook';
import NewArrivals from '@/components/homepage/NewArrivals';
import Newsletter from '@/components/homepage/Newsletter';
import Carousel from '@/components/homepage/ProductCarousel';
import SamsungS22 from '@/components/homepage/SamsungS22';
import ShopCategories from '@/components/homepage/ShopCategories';
import ScrollToTop from '@/components/ui/ToTop';
import { useGetProductsQuery } from '@/redux/api/productApi';

const Home = () => {
  const { data, isLoading } = useGetProductsQuery(undefined);
  const products = data?.data?.data;

  if (isLoading)
    return (
      <div className="min-h-screen flex flex-col gap-y-3 items-center mt-44">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-300"></div>
      </div>
    );

  return (
    <div>
      <ScrollToTop />
      <div className="main-container min-h-screen">
        {/* banner */}
        <Carousel />
        {/* features */}
        <FeatureSummary />
        {/* best deals */}
        <BestDeals products={products} />
        {/* shop categories */}
        <ShopCategories />
        <Macbook />
        {/* new arrivals */}
        <NewArrivals products={products} />
        <SamsungS22 />
        <Collections products={products} />
      </div>
      <Blog />
      <Newsletter />
    </div>
  );
};

export default Home;
