import Loader from "@/components/common/Loader";
import BestDeals from "@/components/homepage/BestDeals";
import Blog from "@/components/homepage/Blog";
import Collections from "@/components/homepage/Collections";
import FeatureSummary from "@/components/homepage/FeatureSummary";
import Macbook from "@/components/homepage/Macbook";
import NewArrivals from "@/components/homepage/NewArrivals";
import Newsletter from "@/components/homepage/Newsletter";
import Carousel from "@/components/homepage/ProductCarousel";
import Testimonials from "@/components/homepage/Review";
import SamsungS22 from "@/components/homepage/SamsungS22";
import ShopCategories from "@/components/homepage/ShopCategories";
import WhyChooseUs from "@/components/homepage/WhyChooseUs";
import ScrollToTop from "@/components/ui/ToTop";
import { useGetProductsQuery } from "@/redux/api/productApi";

const Home = () => {
  const { data, isLoading } = useGetProductsQuery(undefined);
  const products = data?.data?.data;
  console.log(products);
  if (isLoading) return <Loader />;

  return (
    <div>
      <ScrollToTop />
      <div className="main-container">
        {/* banner */}
        <Carousel />
        {/* features */}
        <FeatureSummary />
        {/* best deals */}
        <BestDeals products={products} />
        {/* shop categories */}
        <ShopCategories />
        <Macbook />
      </div>

      {/* new arrivals */}
      <WhyChooseUs />
      <div className="main-container">
        <NewArrivals products={products} />
        <SamsungS22 />
        <Collections products={products} />
      </div>
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default Home;
