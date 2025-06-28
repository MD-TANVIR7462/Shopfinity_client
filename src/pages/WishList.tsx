import ScrollToTop from '@/components/ui/ToTop';
import { useCurrentUser } from '@/redux/features/authSlice';
import {
  setCartProductsInLocalState,
  useShoppingCartProducts,
} from '@/redux/features/shoppingCartSlice';
import {
  RemoveWishedProductFromLocalState,
  useWishedProducts,
} from '@/redux/features/wishListSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { TCurrentUser, TProduct } from '@/types/commonTypes';
import { CiShoppingCart } from 'react-icons/ci';
import { PiEyeLight } from 'react-icons/pi';
import { RxCross2 } from 'react-icons/rx';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import NotFound from './NotFound';

const WishList = () => {
  const { id } = useParams<{ id: string }>();
  const currentUser = useAppSelector(useCurrentUser) as TCurrentUser;
  const shoppingCart = useAppSelector(useShoppingCartProducts);
  const wishedProducts = useAppSelector(useWishedProducts);
  const dispatch = useAppDispatch();

  const removeFromWishList = (product: TProduct) => {
    dispatch(RemoveWishedProductFromLocalState(product));
    toast.success('Product removed from wishlist', {
      position: 'top-right',
      duration: 1500,
      icon: '🤔',
    });
  };

  const addWishedProductToShoppingCart = (product: TProduct) => {
    // check if the product is already in the shopping cart
    const isProductAlreadyInCart = shoppingCart.find(
      (item) => item._id === product._id
    );

    if (isProductAlreadyInCart) {
      toast.error('Product is already in the Shopping Cart!', {
        position: 'top-right',
        duration: 1500,
        icon: '😍',
      });
      dispatch(RemoveWishedProductFromLocalState(product));
      return;
    }

    dispatch(setCartProductsInLocalState(product));
    toast.success('Product added in the Shopping Cart!', {
      position: 'top-right',
      duration: 1500,
      icon: '😍',
    });
    dispatch(RemoveWishedProductFromLocalState(product));
  };

  if (id !== currentUser._id) {
    return <NotFound />;
  }
  return (
    <div>
      <ScrollToTop />
      <div className="main-container mt-24 md:mt-28 lg:px-36">
        {wishedProducts.length > 0 ? (
          <div
            className="shadow rounded"
            data-aos="fade-down"
            data-aos-duration="1500"
          >
            <h4 className="text-custom-black font-semibold py-3 px-4 lg:px-6">
              Wishlist
            </h4>
            <div className="relative overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-pure-gray px-4 lg:px-6">
                <thead className="text-pure-gray text-xs uppercase bg-gray-100 ">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 lg:px-6 py-3 hidden lg:inline-block"
                    ></th>
                    <th
                      scope="col"
                      className="pl-2 lg:px-6 py-3 text-center lg:text-left"
                    >
                      Product
                    </th>
                    <th scope="col" className="px-4 lg:px-6 py-3 text-center">
                      Price
                    </th>
                    <th scope="col" className="px-4 lg:px-6 py-3 text-center">
                      Availability
                    </th>
                    <th scope="col" className="px-4 lg:px-6 py-3 text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {wishedProducts.map((product: TProduct) => (
                    <tr
                      className="bg-white border-b  hover:bg-orange-50 transition-all duration-300 ease-in-out"
                      key={product._id}
                    >
                      <td className="lg:px-6 py-4 font-medium text-gray-700 whitespace-nowrap hidden lg:inline-block">
                        <img
                          src={product.displayImage}
                          alt={product.title}
                          className="w-16 h-16 object-contain"
                        />
                      </td>
                      <td className="px-3 lg:px-6 py-4 font-semibold text-pure-gray text-sm whitespace-nowrap">
                        {product?.title}
                      </td>
                      <td
                        scope="row"
                        className="lg:px-6 py-4 text-pure-gray text-sm font-semibold text-center"
                      >
                        {`$${product.price}`}
                      </td>
                      <td className="lg:px-6 py-4 text-center">
                        {product.stock > 0 ? (
                          <span className="text-green-400">in-stock</span>
                        ) : (
                          <span className="text-red-400">out-of-stock</span>
                        )}
                      </td>
                      <td className="lg:px-6 md:py-4 flex md:space-x-4 justify-center items-center mt-4 md:mt-5">
                        <Link to={`/product/${product?._id}`}>
                          <button
                            className="md:border border-gray-300 p-1 lg:p-2 rounded-full"
                            title="view details"
                          >
                            <PiEyeLight className="md:text-orange md:text-sm lg:text-base" />
                          </button>
                        </Link>
                        <button
                          className="md:bg-orange-400 md:text-white py-1.5 px-3 rounded flex justify-center items-center space-x-1"
                          title="add to cart"
                          onClick={() =>
                            addWishedProductToShoppingCart(product)
                          }
                        >
                          <span className="text-sm lg:text-base hidden md:inline">
                            Add to cart
                          </span>
                          <CiShoppingCart className="font-semibold text-lg" />
                        </button>
                        <button
                          className="p-1 text-base  lg:text-xl"
                          title="remove from wishlist"
                          onClick={() => removeFromWishList(product)}
                        >
                          <RxCross2 className="text-gray-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div
            className="flex flex-col items-center justify-center h-96 md:h-72 lg:h-96"
            data-aos="zoom-in"
            data-aos-duration="1500"
          >
            <h4 className="text-2xl font-semibold text-custom-black">
              Your wishlist is empty
            </h4>
            <Link to="/shop">
              <button className="bg-orange text-white py-2 px-4 rounded mt-4">
                Shop Now
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishList;
