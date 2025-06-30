import { useCurrentUser } from "@/redux/features/authSlice";
import { setCartProductsInLocalState, useShoppingCartProducts } from "@/redux/features/shoppingCartSlice";
import { RemoveWishedProductFromLocalState, useWishedProducts } from "@/redux/features/wishListSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { TCurrentUser, TProduct } from "@/types/commonTypes";
import { CiShoppingCart } from "react-icons/ci";
import { PiEyeLight } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import NotFound from "./NotFound";

const WishList = () => {
  const { id } = useParams<{ id: string }>();
  const currentUser = useAppSelector(useCurrentUser) as TCurrentUser;
  const shoppingCart = useAppSelector(useShoppingCartProducts);
  const wishedProducts = useAppSelector(useWishedProducts);
  const dispatch = useAppDispatch();

  const removeFromWishList = (product: TProduct) => {
    dispatch(RemoveWishedProductFromLocalState(product));
    toast.success("Product removed from wishlist", {
      position: "top-right",
      duration: 1500,
      icon: "🗑️",
    });
  };

  const addWishedProductToShoppingCart = (product: TProduct) => {
    const isProductAlreadyInCart = shoppingCart.find((item) => item._id === product._id);

    if (isProductAlreadyInCart) {
      toast.error("Product is already in the Shopping Cart!", {
        position: "top-right",
        duration: 1500,
        icon: "🛒",
      });
      dispatch(RemoveWishedProductFromLocalState(product));
      return;
    }

    dispatch(setCartProductsInLocalState(product));
    toast.success("Product added in the Shopping Cart!", {
      position: "top-right",
      duration: 1500,
      icon: "✅",
    });
    dispatch(RemoveWishedProductFromLocalState(product));
  };

  if (id !== currentUser._id) {
    return <NotFound />;
  }

  return (
    <div className="main-container mt-24 md:mt-28 lg:px-36 space-y-8 px-4">
      {wishedProducts.length > 0 ? (
        <>
          {/* Banner */}

          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-custom-black">❤️ Your Wishlist</h1>
            <p className="text-gray-600 text-sm md:text-base">Keep an eye on your favorite products!</p>
          </div>

          {/* Wishlist Summary */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 shadow rounded-lg p-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-lg font-bold text-green-700">Wishlist Summary</h3>
              <p className="text-sm text-gray-700">{wishedProducts.length} item(s) saved</p>
            </div>
            <div className="text-sm font-medium text-gray-800">
              Total Estimated Value:{" "}
              <span className="text-green-600 font-bold">
                ${wishedProducts.reduce((acc, p) => acc + p.price, 0).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Wishlist Table */}
          <div className="shadow rounded bg-white">
            <h4 className="text-custom-black font-semibold py-3 px-4">Your Wishlist</h4>
            <div className="relative overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm text-gray-600">
                <thead className="bg-gray-100 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-4 py-3 hidden lg:table-cell">Image</th>
                    <th className="pl-2 py-3">Product</th>
                    <th className="px-4 py-3 text-center">Price</th>
                    <th className="px-4 py-3 text-center">Stock</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {wishedProducts.map((product: TProduct) => (
                    <tr
                      key={product._id}
                      className="bg-white border-b hover:bg-green-50 transition duration-200 ease-in-out"
                    >
                      <td className="px-4 py-4 hidden lg:table-cell">
                        <img
                          src={product.displayImage}
                          alt={product.title}
                          className="w-16 h-16 object-contain rounded-md shadow"
                        />
                      </td>
                      <td className="px-3 py-4 font-medium text-gray-800">{product.title}</td>
                      <td className="px-4 py-4 text-center font-semibold text-gray-700">${product.price}</td>
                      <td className="px-4 py-4 text-center">
                        {product.stock > 0 ? (
                          <span className="text-green-600 font-medium">In stock</span>
                        ) : (
                          <span className="text-red-500 font-medium">Out of stock</span>
                        )}
                      </td>
                      <td className="px-4 py-4 flex flex-wrap justify-center gap-2 items-center">
                        <Link to={`/product/${product._id}`} title="View details">
                          <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full">
                            <PiEyeLight className="text-green-500 hover:text-green-600 w-5 h-5" />
                          </button>
                        </Link>
                        <button
                          onClick={() => addWishedProductToShoppingCart(product)}
                          title="Add to cart"
                          className="bg-green-500/80 text-white rounded-full hover:bg-green-600 flex items-center gap-1 text-sm p-2" 
                        >
                          <CiShoppingCart className="text-lg h-5 w-5 " />
                         
                        </button>
                        <button
                          onClick={() => removeFromWishList(product)}
                          title="Remove from wishlist"
                          className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
                        >
                          <RxCross2 className="w-5 h-5 text-red-500 hover:text-red-600 " />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Info Section */}
          <div className="bg-white rounded shadow px-6 py-4 text-sm text-gray-600 leading-relaxed">
            <h5 className="text-custom-black font-semibold text-base mb-2">About Your Wishlist</h5>
            <p>
              Keep track of items you love. Save products for later, monitor availability, and shop when the time is
              right.
            </p>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-96 text-center" data-aos="zoom-in">
          <h4 className="text-2xl font-semibold text-custom-black">Your wishlist is empty</h4>
          <p className="text-gray-600 mt-2">Start exploring our products and save your favorites.</p>
          <Link to="/shop">
            <button className="bg-green-600 text-white py-2 px-4 rounded mt-4 hover:bg-green-700 transition">
              Shop Now
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default WishList;
