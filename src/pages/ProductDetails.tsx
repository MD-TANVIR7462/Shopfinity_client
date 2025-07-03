import Loader from '@/components/common/Loader';
import Magnifier from '@/components/common/Magnifyer';
import Collections from '@/components/homepage/Collections';
import ScrollToTop from '@/components/ui/ToTop';
import {
  useGetProductsQuery,
  useGetSingleProductQuery,
} from '@/redux/api/productApi';
import {
  RemoveCartProductFromLocalState,
  setCartProductsInLocalState,
  useShoppingCartProducts,
} from '@/redux/features/shoppingCartSlice';
import {
  RemoveWishedProductFromLocalState,
  setWishedProductsInLocalState,
  useWishedProducts,
} from '@/redux/features/wishListSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { TProduct, TProductWithVendorDetails } from '@/types/commonTypes';
import { useState } from 'react';
import { BsCart2 } from 'react-icons/bs';
import { CiHeart } from 'react-icons/ci';
import {
  FaClipboardCheck,
  FaFacebook,
  FaStar,
  FaTwitter,
  FaWhatsapp,
} from 'react-icons/fa';
import { IoHeart } from 'react-icons/io5';
import { PiWarningDiamondThin } from 'react-icons/pi';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import paymentmethods from '../assets/images/Payment Method.png';
import NotFound from './NotFound';

const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState('description');
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetSingleProductQuery(id);
  const product: TProductWithVendorDetails = data?.data;

  const { data: allData, isLoading: isAllProductLoading } =
    useGetProductsQuery(undefined);
  const products = allData?.data?.data;

  const dispatch = useAppDispatch();
  const wishList = useAppSelector(useWishedProducts);
  const isProductInWishList = wishList.find(
    (item) => item?._id === product?._id
  );

  const wishListHandler = (product: TProduct) => {
    // check if product is already in wishlist
    const isProductInWishList = wishList.find(
      (item) => item?._id === product?._id
    );

    if (isProductInWishList) {
      dispatch(RemoveWishedProductFromLocalState(product));
      toast.success('Product removed from wishlist', {
        position: 'top-right',
        duration: 1500,
        icon: '🤔',
      });
    }
    if (!isProductInWishList) {
      dispatch(setWishedProductsInLocalState(product));
      toast.success('Product added in the wishlist!', {
        position: 'top-right',
        duration: 1500,
        icon: '😍',
      });
    }
  };

  const shoppingCart = useAppSelector(useShoppingCartProducts);
  const isProductInCart = shoppingCart.find(
    (item) => item?._id === product?._id
  );

  const addProducttoShoppingCart = (product: TProduct) => {
    dispatch(setCartProductsInLocalState(product));
    toast.success('Product added to the shopping cart', {
      position: 'top-right',
      duration: 1500,
      icon: '😍',
    });
  };

  const removeProductFromCart = (product: TProduct) => {
    dispatch(RemoveCartProductFromLocalState(product));
    toast.success('Product removed from cart', {
      position: 'top-right',
      duration: 1500,
      icon: '🤔',
    });
  };

  if (isLoading)
    return (
      <div>
        <ScrollToTop />
        <Loader />
      </div>
    );

  if (isError) {
    return <NotFound />;
  }

  return (
 <div>

  {/* Product Details Section */}
  <div className="main-container mt-8 grid grid-cols-1 md:grid-cols-12 md:gap-x-12 gap-y-6 md:gap-y-0">
    {/* Left Section: Product Image & Wishlist */}
    <div className="col-span-12 lg:col-span-6">
      <div className="border border-gray-200 rounded p-2 md:p-6 hidden lg:block">
        <Magnifier
          imageUrl={product?.displayImage}
          largeImageUrl={product?.displayImage}
          zoomFactor={1.5}
          imgAlt={product?.title}
          glassDimension={400}
          glassBorderColor="#528b30"
          glassBorderWidth={2}
        />
      </div>
      <div className="border border-gray-200 rounded p-2 md:p-6 lg:hidden">
        <Magnifier
          imageUrl={product?.displayImage}
          largeImageUrl={product?.displayImage}
          zoomFactor={2}
          imgAlt={product?.title}
          glassDimension={160}
          glassBorderColor="#528b30"
          glassBorderWidth={1.5}
        />
      </div>
      <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 justify-between md:items-center mt-4 md:mt-6">
        <button
          className="text-gray-600 flex space-x-2 items-center hover:text-green-600 transition"
          onClick={() => wishListHandler(product as any)}
        >
          {isProductInWishList ? (
            <>
              <IoHeart className="text-green lg:text-lg" />
              <span className="text-sm">Remove from Wishlist</span>
            </>
          ) : (
            <>
              <CiHeart className="lg:text-lg" />
              <span className="text-sm">Add to Wishlist</span>
            </>
          )}
        </button>
        <div className="flex items-center space-x-3 md:pr-24">
          <span className="text-gray-500">Share:</span>
          <Link to={`https://facebook.com/`} target="_blank">
            <FaFacebook className="text-blue-600 hover:scale-110 transition cursor-pointer" />
          </Link>
          <Link to={`https://twitter.com`} target="_blank">
            <FaTwitter className="text-blue-400 hover:scale-110 transition cursor-pointer" />
          </Link>
          <Link to={`https://api.whatsapp.com/send?phone=8801998863753&text=Check this product out!`} target="_blank">
            <FaWhatsapp className="text-green-400 hover:scale-110 transition cursor-pointer" />
          </Link>
        </div>
      </div>
    </div>

    {/* Right Section: Product Info */}
    <div className="col-span-12 lg:col-span-6" data-aos="fade-down" data-aos-duration="1500">
      <div className="pb-8 border-b">
        <div className="flex items-center space-x-5">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-green text-sm md:text-base" />
          ))}
          <p className="text-custom-black text-sm font-semibold">4.7 out of 5</p>
          <p className="text-gray-500 text-sm font-semibold">(253 reviews)</p>
        </div>
        <h3 className="text-custom-black text-3xl font-bold mt-2">{product?.title}</h3>
        <div className="grid grid-cols-2 gap-y-2 text-sm mt-4">
          <div><span className="text-gray-500">Brand:</span> <span className="font-semibold">{product?.brand}</span></div>
          <div><span className="text-gray-500">Availability:</span> <span className={`font-semibold ${product?.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>{product?.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></div>
          <div><span className="text-gray-500">Category:</span> <span className="font-semibold">{product?.category}</span></div>
          <div><span className="text-gray-500">Seller:</span> <span className="font-semibold">{product?.vendor?.name}</span></div>
          <div><span className="text-gray-500">Release Date:</span> <span className="font-semibold">{product?.releaseDate}</span></div>
        </div>
        <div className="flex items-center space-x-4 mt-6">
          <h5 className="text-2xl font-bold text-green-600">${product?.price}</h5>
          <span className="bg-yellow-200 px-3 py-1 rounded-full text-sm font-medium">{product?.runningDiscount}% OFF</span>
        </div>
      </div>
      <div className="mt-6">
        <p className="text-gray-700 leading-relaxed">{product?.description.slice(0, 400)}...</p>
        <p className="mt-2 text-sm text-gray-500">In stock: <span className="text-green-600 font-semibold">{product?.stock}</span></p>
      </div>
      <div className="flex flex-wrap gap-4 mt-8">
        {isProductInCart ? (
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-sm transition-all flex items-center gap-2"
            onClick={() => removeProductFromCart(product as any)}
          >
            <FaClipboardCheck /> Added to Cart
          </button>
        ) : (
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-sm transition-all flex items-center gap-2"
            onClick={() => addProducttoShoppingCart(product as any)}
          >
            <BsCart2 /> Add to Cart
          </button>
        )}
      </div>
      <div className="mt-10 border border-gray-200 rounded p-5">
        <p className="text-sm font-semibold text-custom-black mb-3">100% Guarantee Safe Checkout</p>
        <img src={paymentmethods} alt="payment methods" className="h-4 object-contain" />
      </div>
    </div>
  </div>

  {/* Description & Reviews Section */}
  <div className="main-container">
    <div className="my-10 border border-gray-200 rounded-md py-6 px-4 lg:px-8">
      <div className="flex justify-center items-center space-x-10 mb-6">
        <p
          className={`font-semibold cursor-pointer pb-1 transition-all text-lg ${activeTab === 'description' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-400'}`}
          onClick={() => setActiveTab('description')}
        >
          Description
        </p>
        <p
          className={`font-semibold cursor-pointer pb-1 transition-all text-lg ${activeTab === 'reviews' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-400'}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </p>
      </div>

      {activeTab === 'description' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-custom-black font-semibold mb-2">Description</h4>
            <p className="text-pure-gray text-sm leading-relaxed">{product?.description.slice(0, 700)}</p>
          </div>
          <div>
            <h4 className="text-custom-black font-semibold mb-2">Features</h4>
            <ul className="space-y-2 text-sm text-pure-gray">
              <li><PiWarningDiamondThin className="inline text-green-600 mr-1" /> Free 1 Year Warranty</li>
              <li><PiWarningDiamondThin className="inline text-green-600 mr-1" /> Free Shipping & Fast Delivery</li>
              <li><PiWarningDiamondThin className="inline text-green-600 mr-1" /> 100% Money-back Guarantee</li>
              <li><PiWarningDiamondThin className="inline text-green-600 mr-1" /> 24/7 Customer Support</li>
              <li><PiWarningDiamondThin className="inline text-green-600 mr-1" /> Secure Payment</li>
            </ul>
          </div>
          <div>
            <h4 className="text-custom-black font-semibold mb-2">Shipping Info</h4>
            <ul className="space-y-2 text-sm text-pure-gray">
              <li>Courier: 2-4 days, Free Shipping</li>
              <li>Local: 5-7 days, $19</li>
              <li>UPS Ground: 6-7 days, Free</li>
              <li>UPS Fallback: 10-12 days, $29</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="max-h-[400px] overflow-y-auto space-y-6 px-2">
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="border-b pb-4">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 text-green-800 h-10 w-10 flex items-center justify-center font-bold rounded-full">
                  {`U${idx+1}`}
                </div>
                <div>
                  <p className="font-semibold text-custom-black">User {idx + 1}</p>
                  <div className="flex text-green-600">
                    {[...Array(5)].map((_, i) => <FaStar key={i} className="text-xs" />)}
                  </div>
                </div>
              </div>
              <p className="text-sm text-pure-gray mt-2">Amazing product! The build quality is excellent and delivery was fast. Definitely recommended.</p>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>

  {/* Recommended Products Section */}
  {!isAllProductLoading && (
    <div className="my-12 main-container">
      <Collections products={products} />
    </div>
  )}
</div>


  );
};

export default ProductDetails;
