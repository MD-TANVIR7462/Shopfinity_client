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
import { IoHeart } from 'react-icons/io5';
import { PiEyeLight, PiShoppingCartSimpleFill } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface CollectionsProps {
  products: TProduct[];
}

const Collections: React.FC<CollectionsProps> = ({ products }) => {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const newArrival: TProduct[] = [products[0], products[1], products[2]];
  const bestSellers: TProduct[] = [products[3], products[4], products[5]];
  const topRated: TProduct[] = [products[6], products[7], products[8]];
  const flashSaleToday: TProduct[] = [products[9], products[10], products[11]];

  const dispatch = useAppDispatch();
  const wishList = useAppSelector(useWishedProducts);

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
    <div className="mt-14 lg:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 lg:px-12 gap-x-6 gap-y-10">
      {/* flash sale today */}
      <div
        className="cols-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
        data-aos="fade-down"
        data-aos-duration="1500"
      >
        <h4 className="text-custom-black font-semibold leading-6 mb-4 uppercase">
          Flash Sale Today
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {flashSaleToday?.map((product: TProduct) => {
            const isProductInWishList = wishList.find(
              (item) => item?._id === product?._id
            );
            const isProductInShoppingCart = shoppingCart.find(
              (item: TProduct) => item?._id === product?._id
            );
            return (
              <div
                key={product?._id}
                className="col-span-12 md:col-span-4 lg:col-span-12 flex flex-row space-x-6 py-3 px-6 items-center border border-gray-100 relative rounded"
                onMouseEnter={() => setHoveredProduct(product?._id)}
                onMouseLeave={() => setHoveredProduct(null)}
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
                  src={product?.displayImage}
                  alt={product?.title}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <h6 className="text-custom-black text-sm font-semibold">
                    {product?.title}
                  </h6>
                  <p className="text-[#528b30] text-sm">{`$${product?.price}`}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* best sellers */}
      <div
        className="cols-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
        data-aos="fade-down"
        data-aos-duration="1500"
      >
        <h4 className="text-custom-black font-semibold leading-6 mb-4 uppercase">
          Best Sellers
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {bestSellers?.map((product: TProduct) => {
            const isProductInWishList = wishList.find(
              (item: TProduct) => item?._id === product?._id
            );
            const isProductInShoppingCart = shoppingCart.find(
              (item: TProduct) => item?._id === product?._id
            );
            return (
              <div
                key={product?._id}
                className="col-span-12 md:col-span-4 lg:col-span-12 flex flex-row space-x-6 py-3 px-6 items-center border border-gray-100 relative rounded"
                onMouseEnter={() => setHoveredProduct(product?._id)}
                onMouseLeave={() => setHoveredProduct(null)}
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
                  src={product?.displayImage}
                  alt={product?.title}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <h6 className="text-custom-black text-sm font-semibold">
                    {product?.title}
                  </h6>
                  <p className="text-[#528b30] text-sm">{`$${product?.price}`}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* top rated */}
      <div
        className="cols-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
        data-aos="fade-down"
        data-aos-duration="1500"
      >
        <h4 className="text-custom-black font-semibold leading-6 mb-4 uppercase">
          Top Rated
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {topRated?.map((product: TProduct) => {
            const isProductInWishList = wishList.find(
              (item) => item?._id === product?._id
            );
            const isProductInShoppingCart = shoppingCart.find(
              (item: TProduct) => item?._id === product?._id
            );
            return (
              <div
                key={product?._id}
                className="col-span-12 md:col-span-4 lg:col-span-12 flex flex-row space-x-6 py-3 px-6 items-center border border-gray-100 relative rounded"
                onMouseEnter={() => setHoveredProduct(product?._id)}
                onMouseLeave={() => setHoveredProduct(null)}
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
                  src={product?.displayImage}
                  alt={product?.title}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <h6 className="text-custom-black text-sm font-semibold">
                    {product?.title}
                  </h6>
                  <p className="text-[#528b30] text-sm">{`$${product?.price}`}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* new arrival */}
      <div
        className="cols-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
        data-aos="fade-down"
        data-aos-duration="1500"
      >
        <h4 className="text-custom-black font-semibold leading-6 mb-4 uppercase">
          New Arrival
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {newArrival?.map((product: TProduct) => {
            const isProductInWishList = wishList.find(
              (item: TProduct) => item?._id === product?._id
            );
            const isProductInShoppingCart = shoppingCart.find(
              (item: TProduct) => item?._id === product?._id
            );
            return (
              <div
                key={product?._id}
                className="col-span-12 md:col-span-4 lg:col-span-12 flex flex-row space-x-6 py-3 px-6 items-center border border-gray-100 relative rounded"
                onMouseEnter={() => setHoveredProduct(product?._id)}
                onMouseLeave={() => setHoveredProduct(null)}
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
                  src={product?.displayImage}
                  alt={product?.title}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <h6 className="text-custom-black text-sm font-semibold">
                    {product?.title}
                  </h6>
                  <p className="text-[#528b30] text-sm">{`$${product?.price}`}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Collections;
