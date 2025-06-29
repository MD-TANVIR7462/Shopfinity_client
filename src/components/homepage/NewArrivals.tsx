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
import { TProduct } from '@/types/commonTypes';
import { useState } from 'react';
import { CiHeart, CiShoppingCart } from 'react-icons/ci';
import { FaClipboardCheck, FaStar } from 'react-icons/fa';
import { FaArrowRightLong } from 'react-icons/fa6';
import { IoHeart } from 'react-icons/io5';
import { PiEyeLight, PiShoppingCartSimpleFill } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import headphoneImage from '../../assets/images/headphone.png';

interface NewArrivalProps {
  products: TProduct[];
}

const NewArrivals: React.FC<NewArrivalProps> = ({ products }) => {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const newArrivalProducts: TProduct[] = products?.slice(0, 9);

  const dispatch = useAppDispatch();
  const wishList = useAppSelector(useWishedProducts);
  const isHighlightedProductInWishList = wishList.find(
    (item) => item?._id === newArrivalProducts[0]?._id
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
  const isHighlightedProductInShoppingCart = shoppingCart.find(
    (item) => item?._id === newArrivalProducts[0]?._id
  );

  const shoppingCartHandler = (product: TProduct) => {
    // check if product is already in shopping cart
    const isProductInShoppingCart = shoppingCart.find(
      (item) => item?._id === product?._id
    );

    if (isProductInShoppingCart) {
      dispatch(RemoveCartProductFromLocalState(product));
      toast.success('Product removed from Shopping Cart', {
        position: 'top-right',
        duration: 1500,
        icon: '🤔',
      });
    }
    if (!isProductInShoppingCart) {
      dispatch(setCartProductsInLocalState(product));
      toast.success('Product added in the Shopping Cart!', {
        position: 'top-right',
        duration: 1500,
        icon: '😍',
      });
    }
  };

  return (
    <div className="mt-14 lg:mt-20">
      <div className="header flex items-center mb-6">
        <h2 className="text-custom-black font-semibold text-xl md:text-2xl mr-10">
          New Arrivals
        </h2>
        <Link to="/shop" className="ml-auto">
          <button className=" text-[#528b30] flex items-center gap-x-1 text-sm">
            <span className="text-[#528b30]">Browse All Products </span>
            <span>
              {' '}
              <FaArrowRightLong />{' '}
            </span>
          </button>
        </Link>
      </div>
      {/* product cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-1">
        {/* small products */}
        <div className="col-span-12 md:col-span-12 lg:col-span-10 grid grid-cols-2 md:grid-cols-4 rounded gap-3">
          {newArrivalProducts?.slice(1, 9)?.map((product: TProduct) => {
            const isProductInWishList = wishList.find(
              (item: TProduct) => item?._id === product?._id
            );
            const isProductInShoppingCart = shoppingCart.find(
              (item: TProduct) => item?._id === product?._id
            );
            return (
              <div
                key={product?._id}
                className="border border-gray-100 py-2 px-4 relative rounded"
                onMouseEnter={() => setHoveredProduct(product?._id)}
                onMouseLeave={() => setHoveredProduct(null)}
                data-aos="fade-down"
                data-aos-duration="1500"
              >
                {hoveredProduct === product?._id && (
                  <div className="absolute inset-0 flex items-center justify-center bg-opacity-5">
                    <div className="absolute inset-0 bg-custom-black opacity-75 rounded"></div>
                    <div className="z-10 relative flex items-center justify-center w-full h-full">
                      <button
                        className="bg-orange text-white rounded-full h-8 w-8 flex justify-center items-center text-2xl font-semibold"
                        onClick={() => wishListHandler(product)}
                      >
                        {isProductInWishList ? <IoHeart /> : <CiHeart />}
                      </button>
                      <button
                        className="bg-orange text-white rounded-full h-8 w-8 flex justify-center items-center text-2xl font-semibold mx-3"
                        onClick={() => shoppingCartHandler(product)}
                      >
                        {isProductInShoppingCart ? (
                          <PiShoppingCartSimpleFill />
                        ) : (
                          <CiShoppingCart />
                        )}
                      </button>
                      <Link to={`/product/${product?._id}`}>
                        <button className="bg-orange text-white rounded-full h-8 w-8 flex justify-center items-center text-2xl font-semibold">
                          <PiEyeLight />
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
                <img
                  src={
                    product?.displayImage
                      ? product?.displayImage
                      : headphoneImage
                  }
                  alt="product"
                  className="w-full h-40 object-contain"
                />
                <h5 className="mt-5 text-sm">{`${product?.title}`}</h5>
                <p className="text-[#528b30] font-semibold text-md">{`$${product?.price}`}</p>
              </div>
            );
          })}
        </div>
        {/* big product */}
        <div
          className="col-span-12 md:hidden lg:block lg:col-span-2 border border-gray-100 py-4 lg:bg-gray-300/20 px-10 lg:px-3 rounded"
          data-aos="fade-down"
          data-aos-duration="1500"
        >
          <h3 className="text-center font-semibold text-sm mb-2">
            Buy today's hot deal <br /> with the best price in the market
          </h3>
          <img
            src={newArrivalProducts[0]?.displayImage}
            alt={newArrivalProducts[0]?.title}
            className="w-full h-40 object-contain"
          />
          <div className="flex items-center space-x-1 mt-6 mb-1">
            <FaStar className="text-orange text-xs" />
            <FaStar className="text-orange text-xs" />
            <FaStar className="text-orange text-xs" />
            <FaStar className="text-orange text-xs" />
            <FaStar className="text-orange text-xs" />
            <span className="text-graish text-xs">(5)</span>
          </div>
          <h4 className="text-custom-black mb-4 text-xl">
            {newArrivalProducts[0]?.title}
          </h4>
          <h5 className="text-[#528b30] font-semibold text-md mt-2 mb-4">
            {`$${newArrivalProducts[0]?.price}`}
          </h5>
          <h5 className="text-graish text-sm mt-2 mb-2">
            {newArrivalProducts[0]?.description?.slice(0, 100)}
          </h5>
          <div className="flex items-center space-x-1  lg:justify-around mt-4">
            <button
              className="bg-orange rounded-sm text-white py-2 text-lg px-3 lg:hidden 2xl:block"
              onClick={() => wishListHandler(newArrivalProducts[0])}
            >
              {isHighlightedProductInWishList ? <IoHeart /> : <CiHeart />}
            </button>
            <button
              className="bg-orange rounded-sm text-white py-[7px] text-sm px-3  flex justify-center items-center space-x-2 w-40 text-nowrap"
              onClick={() => shoppingCartHandler(newArrivalProducts[0])}
            >
              {isHighlightedProductInShoppingCart ? (
                <>
                  <FaClipboardCheck /> <span>Added</span>
                </>
              ) : (
                'Add to Cart'
              )}
            </button>
            <Link to={`/product/${newArrivalProducts[0]?._id}`}>
              <button className="bg-orange rounded-sm text-white py-2 text-lg px-3 lg:hidden 2xl:block">
                <PiEyeLight />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
