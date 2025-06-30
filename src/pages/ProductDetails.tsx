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
      <ScrollToTop />
      {/* product details */}
      <div className="main-container mt-8 grid grid-cols-1 md:grid-cols-12 md:gap-x-12 gap-y-6 md:gap-y-0">
        <div className="col-span-12 lg:col-span-6">
          {/* from tab to large devices */}
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
          {/* for mobile and tab devices */}
          <div className="border border-gray-200 rounded p-2 md:p-6 lg:hidden">
            <Magnifier
              imageUrl={product?.displayImage}
              largeImageUrl={product?.displayImage}
              zoomFactor={2}
              imgAlt={product?.title}
              glassDimension={250}
              glassBorderColor="#be9a35"
              glassBorderWidth={2}
            />
          </div>
          {/* add to wishlist and share */}
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 justify-between md:items-center mt-4 md:mt-6">
            <div>
              <button
                className=" text-gray-600 flex space-x-1 md:space-x-2 items-center"
                onClick={() => wishListHandler(product as any)}
              >
                {isProductInWishList ? (
                  <>
                    <IoHeart className="text-orange lg:text-lg" />{' '}
                    <span className="text-sm">Remove from Wishlist</span>
                  </>
                ) : (
                  <>
                    <CiHeart className="lg:text-lg" />{' '}
                    <span className="text-sm">Add to Wishlist</span>
                  </>
                )}
              </button>
            </div>
            <div className="flex items-center space-x-2 md:pr-24">
              <span className="text-gray-500">share product: </span>{' '}
              <div className="flex items-center space-x-2 md:space-x-3">
                <Link
                  to={`https://facebook.com/babulakterfsd2`}
                  target="_blank"
                >
                  <FaFacebook className="text-blue-600 cursor-pointer" />
                </Link>
                <Link to={`https://twitter.com/babulakterfsd`} target="_blank">
                  <FaTwitter className="text-blue-400 cursor-pointer" />
                </Link>
                <Link
                  to={`https://api.whatsapp.com/send?phone=8801740020464&text=Hello,%20Babul%20Akter`}
                  target="_blank"
                >
                  <FaWhatsapp className="text-green-400 cursor-pointer" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-span-12 lg:col-span-6 border-gray-200"
          data-aos="fade-down"
          data-aos-duration="1500"
        >
          <div className="pb-8 border-b">
            {/* user feedback */}
            <div className="flex items-center justify-start space-x-5 md:mt-4 lg:mt-0">
              <div className="flex space-x-1 items-center">
                <FaStar className="text-orange text-sm md:text-[16px]" />
                <FaStar className="text-orange text-sm md:text-[16px]" />
                <FaStar className="text-orange text-sm md:text-[16px]" />
                <FaStar className="text-orange text-sm md:text-[16px]" />
                <FaStar className="text-orange text-sm md:text-[16px]" />
              </div>
              <p className="text-custom-black text-sm md:font-semibold">{`${4.7} out of 5`}</p>
              <p className="text-gray-500 text-sm md:font-semibold">{`(${253} feedbacks)`}</p>
            </div>
            <h3 className="text-custom-black text-2xl mt-1">
              {product?.title}
            </h3>
            <div className="flex justify-between items-center mt-5 md:pr-24">
              <div>
                <span className="text-gray-500">brand: </span>{' '}
                <span className="font-semibold text-sm">{product?.brand}</span>
              </div>
              <div>
                <span className="text-gray-500">availability: </span>{' '}
                <span className="text-green-600 font-semibold text-sm">
                  {product?.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center mt-2 md:pr-24">
              <div>
                <span className="text-gray-500">category: </span>{' '}
                <span className="font-semibold text-sm">
                  {product?.category}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Seller: </span>{' '}
                <span className="font-semibold text-sm">
                  {product?.vendor?.name}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div>
                <span className="text-gray-500">release date: </span>{' '}
                <span className="font-semibold text-sm">
                  {product?.releaseDate}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-6 mt-6">
              <h5 className="text-2xl font-bold text-[#528b30] ">{`$${product?.price}`}</h5>
              <button className="bg-deep-yellow py-1 px-4 rounded text-gray-700 font-semibold flex items-center gap-x-1 md:gap-x-2">
                {`${product?.runningDiscount}%  OFF`}
              </button>
            </div>
          </div>
          <div className="mt-6">
            <p>{`${product?.description.slice(0, 400)}...`}</p>
            <div className="flex justify-between items-center mt-2">
              <div>
                <span className="text-gray-500">in stock: </span>{' '}
                <span className="font-semibold text-sm text-green-600">
                  {product?.stock}
                </span>
              </div>
            </div>
          </div>
          {/* action buttons */}
          <div className="flex justify-start items-center space-x-1 md:space-x-4 mt-3 md:mt-12">
            {/* add to cart button */}
            {isProductInCart ? (
              <div>
                <button
                  className="bg-orange py-[9px] px-4 rounded text-white font-semibold flex items-center justify-center space-x-1 lg:space-x-4 w-[160px] lg:w-[170px]"
                  onClick={() => removeProductFromCart(product as any)}
                >
                  <FaClipboardCheck /> <span>Added to Cart</span>
                </button>
              </div>
            ) : (
              <div>
                <button
                  className="bg-orange py-[9px] px-4 rounded text-white font-semibold flex items-center justify-center space-x-4 w-[160px] lg:w-[170px]"
                  onClick={() => addProducttoShoppingCart(product as any)}
                >
                  <BsCart2 />
                  <span className="md:text-[16px] text-nowrap">
                    Add to Cart
                  </span>
                </button>
              </div>
            )}

            {/* buy now button */}
            {/* <div>
              <button
                className="border border-orange-400 py-2 px-4 rounded text-white font-semibold text-orange hover:bg-orange-400 hover:text-white transition-all duration-300 disabled:cursor-not-allowed"
                disabled={true}
              >
                Buy Now
              </button>
            </div> */}
          </div>
          {/* 100% safe checkout cards */}
          <div className="mt-7 md:mt-9 lg:mt-12 border border-gray-200 rounded py-5 px-6">
            <p className="text-sm text-custom-black font-semibold mb-2">
              100% Guarantee Safe Checkout
            </p>
            <img
              src={paymentmethods}
              alt="payment methods"
              className="h-4 object-contain"
            />
          </div>
        </div>
      </div>
      {/* product description and reviews */}
      <div
        className="main-container"
   
      >
        <div className="my-8 md:mt-14 lg:mt-20 border border-gray-200 rounded-md py-4 md:py-6 h-[850px] md:h-[700px] lg:h-[425px]">
          <div className="flex justify-center items-center space-x-10 mb-6 lg:mb-20">
            <p
              className={`font-semibold text-custom-black cursor-pointer pb-1  ${
                activeTab === 'description'
                  ? 'border-b-2 border-orange-400 '
                  : 'text-pure-gray'
              }`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </p>
            {/* <p
              className={`font-semibold text-custom-black cursor-pointer pb-1 ${
                activeTab !== 'description'
                  ? 'border-b-2 border-orange-400 '
                  : 'text-pure-gray'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </p> */}
          </div>
          {/* tab details */}
          {activeTab === 'description' ? (
            <div className="grid grid-cols-1 md:grid-cols-12 lg:space-x-24 px-6 lg:px-10">
              {/* description */}
              <div className="col-span-12 lg:col-span-4">
                <h4 className="text-custom-black font-semibold mb-2">
                  Description
                </h4>
                <p className="text-pure-gray text-sm">
                  {product?.description.slice(0, 700)}
                </p>
              </div>
              {/* features */}
              <div className="col-span-12 lg:col-span-4">
                <h4 className="text-custom-black font-semibold mb-2 lg:mb-4 mt-6 lg:mt-0">
                  Features
                </h4>
                <div className="flex flex-col space-y-2 md:space-y-3">
                  <div className="flex items-center space-x-1 font-semibold text-sm">
                    <PiWarningDiamondThin className="text-orange-600" />
                    <p className="text-pure-gray">Free 1 Year Warranty</p>
                  </div>
                  <div className="flex items-center space-x-1 font-semibold text-sm">
                    <PiWarningDiamondThin className="text-orange-600" />
                    <p className="text-pure-gray">
                      Free Shipping &amp; Fasted Delivery
                    </p>
                  </div>
                  <div className="flex items-center space-x-1 font-semibold text-sm">
                    <PiWarningDiamondThin className="text-orange-600" />
                    <p className="text-pure-gray">100% Money-back guarantee</p>
                  </div>
                  <div className="flex items-center space-x-1 font-semibold text-sm">
                    <PiWarningDiamondThin className="text-orange-600" />
                    <p className="text-pure-gray">24/7 Customer support</p>
                  </div>
                  <div className="flex items-center space-x-1 font-semibold text-sm">
                    <PiWarningDiamondThin className="text-orange-600" />
                    <p className="text-pure-gray">Secure payment method</p>
                  </div>
                </div>
              </div>
              {/* shipping infos */}
              <div className="col-span-12 lg:col-span-4 lg:border-l lg:pl-6 border-orange-400">
                <h4 className="text-custom-black font-semibold mb-2 lg:mb-4 mt-6 lg:mt-0">
                  Shipping Information
                </h4>
                <div className="flex flex-col space-y-2 md:space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <p>courier: </p>
                    <p className="text-pure-gray">2-4 days, free shipping</p>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <p>local shipping: </p>
                    <p className="text-pure-gray">
                      upto one week, additional $19
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <p>ups ground: </p>
                    <p className="text-pure-gray">6-7 days, free shipping</p>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <p>ups fallback: </p>
                    <p className="text-pure-gray">10-12 days, $29</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p className="px-12">This feature will be available soon !</p>
            </div>
          )}
        </div>
      </div>
      {!isAllProductLoading && (
        <div className="my-8 md:my-20 main-container">
          <Collections products={products} />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
