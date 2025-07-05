import Loader from "@/components/common/Loader";
import Magnifier from "@/components/common/Magnifyer";
import Collections from "@/components/homepage/Collections";
import ScrollToTop from "@/components/ui/ToTop";
import { useGetProductsQuery, useGetSingleProductQuery } from "@/redux/api/productApi";
import {
  RemoveCartProductFromLocalState,
  setCartProductsInLocalState,
  useShoppingCartProducts,
} from "@/redux/features/shoppingCartSlice";
import {
  RemoveWishedProductFromLocalState,
  setWishedProductsInLocalState,
  useWishedProducts,
} from "@/redux/features/wishListSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { TProduct, TProductWithVendorDetails } from "@/types/commonTypes";
import { useState } from "react";
import { BsCart2, BsShare } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { FaClipboardCheck, FaFacebook, FaStar, FaTwitter, FaWhatsapp, FaRegStar } from "react-icons/fa";
import { IoHeart } from "react-icons/io5";
import { PiWarningDiamondThin } from "react-icons/pi";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import paymentmethods from "../assets/images/Payment Method.png";
import NotFound from "./NotFound";

const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetSingleProductQuery(id);
  const product: TProductWithVendorDetails = data?.data;

  const { data: allData, isLoading: isAllProductLoading } = useGetProductsQuery(undefined);
  const products = allData?.data?.data;

  const dispatch = useAppDispatch();
  const wishList = useAppSelector(useWishedProducts);
  const isProductInWishList = wishList.find((item) => item?._id === product?._id);

  const wishListHandler = (product: TProduct) => {
    const isProductInWishList = wishList.find((item) => item?._id === product?._id);

    if (isProductInWishList) {
      dispatch(RemoveWishedProductFromLocalState(product));
      toast.success("Product removed from wishlist", {
        position: "top-right",
        duration: 1500,
        icon: "🤔",
      });
    }
    if (!isProductInWishList) {
      dispatch(setWishedProductsInLocalState(product));
      toast.success("Product added in the wishlist!", {
        position: "top-right",
        duration: 1500,
        icon: "😍",
      });
    }
  };

  const shoppingCart = useAppSelector(useShoppingCartProducts);
  const isProductInCart = shoppingCart.find((item) => item?._id === product?._id);

  const addProducttoShoppingCart = (product: TProduct) => {
    dispatch(setCartProductsInLocalState(product));
    toast.success("Product added to the shopping cart", {
      position: "top-right",
      duration: 1500,
      icon: "😍",
    });
  };

  const removeProductFromCart = (product: TProduct) => {
    dispatch(RemoveCartProductFromLocalState(product));
    toast.success("Product removed from cart", {
      position: "top-right",
      duration: 1500,
      icon: "🤔",
    });
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating", { position: "top-right" });
      return;
    }
    toast.success("Thank you for your review!", { position: "top-right" });
    setReviewText("");
    setRating(0);
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
    <div className="bg-gray-50">
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
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 justify-between md:items-center mt-4 md:mt-6">
            <button
              className="text-gray-600 flex space-x-2 items-center hover:text-green-600 transition"
              onClick={() => wishListHandler(product as any)}
            >
              {isProductInWishList ? (
                <>
                  <IoHeart className="text-green-600 lg:text-lg" />
                  <span className="text-sm font-medium">Remove from Wishlist</span>
                </>
              ) : (
                <>
                  <CiHeart className="lg:text-lg" />
                  <span className="text-sm font-medium">Add to Wishlist</span>
                </>
              )}
            </button>
            <div className="flex items-center space-x-3">
              <span className="text-gray-500 text-sm">Share:</span>
              <div className="flex space-x-3">
                <Link
                  to={`https://facebook.com/`}
                  target="_blank"
                  className="p-2 bg-gray-100 rounded-full hover:bg-blue-50 transition"
                >
                  <FaFacebook className="text-blue-600 hover:scale-110 transition" />
                </Link>
                <Link
                  to={`https://twitter.com`}
                  target="_blank"
                  className="p-2 bg-gray-100 rounded-full hover:bg-blue-50 transition"
                >
                  <FaTwitter className="text-blue-400 hover:scale-110 transition" />
                </Link>
                <Link
                  to={`https://api.whatsapp.com/send?phone=8801998863753&text=Check this product out!`}
                  target="_blank"
                  className="p-2 bg-gray-100 rounded-full hover:bg-green-50 transition"
                >
                  <FaWhatsapp className="text-green-500 hover:scale-110 transition" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Product Info */}
        <div className="col-span-12 lg:col-span-6" data-aos="fade-down" data-aos-duration="1500">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400 text-sm md:text-base" />
              ))}
              <p className="text-gray-800 text-sm font-medium">4.7 (253 reviews)</p>
            </div>
            <h1 className="text-gray-900 text-3xl font-bold mb-2">{product?.title}</h1>
            <div className="grid grid-cols-2 gap-y-3 text-sm mt-4 mb-6">
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">Brand:</span>
                <span className="font-medium">{product?.brand}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">Availability:</span>
                <span className={`font-medium ${product?.stock > 0 ? "text-green-600" : "text-red-500"}`}>
                  {product?.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">Category:</span>
                <span className="font-medium">{product?.category}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">Seller:</span>
                <span className="font-medium">{product?.vendor?.name}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <h5 className="text-3xl font-bold text-green-600">${product?.price}</h5>
              {product?.runningDiscount > 0 && (
                <div className="flex items-center">
                  <span className="text-gray-400 line-through mr-2">
                    ${(product?.price * (1 + product?.runningDiscount / 100)).toFixed(2)}
                  </span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    Save {product?.runningDiscount}%
                  </span>
                </div>
              )}
            </div>

            <p className="text-gray-700 mb-6">{product?.description.slice(0, 300)}...</p>

            <div className="flex flex-wrap gap-3 mb-6">
              {isProductInCart ? (
                <button
                  className="bg-[#5eb313d3] hover:bg-[#5eb313] text-white font-semibold py-3 px-8 rounded-lg shadow-sm transition-all flex items-center gap-2"
                  onClick={() => removeProductFromCart(product as any)}
                >
                  <FaClipboardCheck /> Added to Cart
                </button>
              ) : (
                <button
                  className="bg-[#5eb313d3] hover:bg-[#5eb313] text-white font-semibold py-3 px-8 rounded-lg shadow-sm transition-all flex items-center gap-2"
                  onClick={() => addProducttoShoppingCart(product as any)}
                >
                  <BsCart2 /> Add to Cart
                </button>
              )}
              <button className="border border-[#5eb313d3]  text-[#5eb313d3]  hover:bg-green-50 font-semibold py-3 px-6 rounded-lg shadow-sm transition-all flex items-center gap-2">
                Buy Now
              </button>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <p className="text-sm font-medium text-gray-700 mb-3">Guaranteed safe checkout</p>
              <img src={paymentmethods} alt="payment methods" className="h-6 object-contain" />
            </div>
          </div>
        </div>
      </div>

      {/* Description & Reviews Section */}
      <div className="main-container my-10">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="border-b border-gray-100">
            <div className="flex space-x-8">
              <button
                className={`px-6 py-4 font-medium text-lg ${
                  activeTab === "description"
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
              <button
                className={`px-6 py-4 font-medium text-lg ${
                  activeTab === "reviews"
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews (253)
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === "description" ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-gray-900 font-semibold text-lg mb-4">Product Details</h4>
                  <p className="text-gray-600 leading-relaxed">{product?.description}</p>
                </div>
                <div>
                  <h4 className="text-gray-900 font-semibold text-lg mb-4">Features</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <PiWarningDiamondThin className="text-green-600 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">Free 1 Year Warranty</span>
                    </li>
                    <li className="flex items-start">
                      <PiWarningDiamondThin className="text-green-600 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">Free Shipping & Fast Delivery</span>
                    </li>
                    <li className="flex items-start">
                      <PiWarningDiamondThin className="text-green-600 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">100% Money-back Guarantee</span>
                    </li>
                    <li className="flex items-start">
                      <PiWarningDiamondThin className="text-green-600 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">24/7 Customer Support</span>
                    </li>
                    <li className="flex items-start">
                      <PiWarningDiamondThin className="text-green-600 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">Secure Payment</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-gray-900 font-semibold text-lg mb-4">Shipping Information</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-green-600 mt-0.5 mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                      <div>
                        <span className="text-gray-600 font-medium">Courier:</span>
                        <span className="text-gray-600 ml-1">2-4 days, Free Shipping</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-green-600 mt-0.5 mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      <div>
                        <span className="text-gray-600 font-medium">Local:</span>
                        <span className="text-gray-600 ml-1">5-7 days, $19</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-green-600 mt-0.5 mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                      </svg>
                      <div>
                        <span className="text-gray-600 font-medium">UPS Ground:</span>
                        <span className="text-gray-600 ml-1">6-7 days, Free</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Review Form */}
                <div className="bg-gradient-to-r from-green-50/20 to-gray-50 rounded-xl p-6 shadow-sm">
                  <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <FaStar className="text-yellow-400 mr-2" />
                    Share Your Experience
                  </h4>
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        How would you rate this product?
                      </label>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            className="focus:outline-none transform hover:scale-110 transition"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                          >
                            {star <= (hoverRating || rating) ? (
                              <FaStar className="text-yellow-400 text-3xl" />
                            ) : (
                              <FaRegStar className="text-gray-300 text-3xl hover:text-yellow-300" />
                            )}
                          </button>
                        ))}
                      </div>
                      
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">Your Review</label>
                      <textarea
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent transition"
                        rows={5}
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Tell us what you think about this product..."
                      ></textarea>
                    </div>

                    <div className="flex items-center">
                      <button
                        type="submit"
                        className="bg-[#5eb313d3] hover:bg-[#5eb313] text-white font-medium py-3 px-8 rounded-lg shadow-md transition-all flex items-center"
                      >
                        <FaStar className="mr-2" />
                        Submit Review
                      </button>
                      <span className="ml-4 text-xs text-gray-500">Your review helps others make better choices</span>
                    </div>
                  </form>
                </div>

                {/* Reviews List */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <FaStar className="text-yellow-400 mr-2" />
                    Customer Reviews
                    <span className="ml-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                      253
                    </span>
                  </h4>

                  <div className="space-y-6">
                    {[...Array(5)].map((_, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
                        data-aos="fade-up"
                        data-aos-delay={idx * 100}
                      >
                        <div className="flex items-start space-x-4">
                          <div className="bg-gradient-to-br from-green-100 to-blue-100 text-green-800 h-12 w-12 flex items-center justify-center font-bold rounded-full">
                            {`U${idx + 1}`}
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <div>
                                <p className="font-semibold text-gray-900">User {idx + 1}</p>
                                <div className="flex items-center mt-1">
                                  <div className="flex text-yellow-400 mr-3">
                                    {[...Array(5)].map((_, i) => (
                                      <FaStar key={i} className="text-sm" />
                                    ))}
                                  </div>
                                  <span className="text-xs text-gray-500">
                                    {["2 days", "1 week", "3 weeks", "1 month", "2 months"][idx]} ago
                                  </span>
                                </div>
                              </div>
                              <div className="flex space-x-3 mt-2 sm:mt-0">
                                <button className="text-gray-400 hover:text-green-600 transition">
                                  <BsShare className="text-sm" />
                                </button>
                                <button className="text-gray-400 hover:text-red-500 transition">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>

                            <p className="text-gray-600 mt-3">
                              {
                                [
                                  "This product exceeded my expectations! The quality is outstanding and it arrived earlier than expected. I would definitely recommend this to anyone looking for premium quality.",
                                  "Very satisfied with my purchase. The product looks exactly like the pictures and works perfectly. The seller was very professional and shipping was fast.",
                                  "Good product for the price. It does what it's supposed to do, though the material could be slightly better. Overall happy with my purchase.",
                                  "Absolutely amazing! Better than I imagined. The packaging was secure and the product itself is beautiful. Will be buying again soon!",
                                  "Decent product but took longer to arrive than estimated. The quality is good but not exceptional. Might consider buying again if needed.",
                                ][idx]
                              }
                            </p>

                            <div className="flex items-center mt-4 space-x-4">
                              <button className="flex items-center text-sm text-gray-500 hover:text-green-600 transition">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 mr-1"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                                  />
                                </svg>
                                Helpful ({[24, 18, 5, 32, 2][idx]})
                              </button>
                              <button className="flex items-center text-sm text-gray-500 hover:text-green-600 transition">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 mr-1"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                  />
                                </svg>
                                Comment
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex justify-center">
                    <button className="bg-white border border-green-600 text-green-600 hover:bg-green-50 font-medium py-2 px-6 rounded-lg shadow-sm transition flex items-center">
                      Load More Reviews
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recommended Products Section */}
      {!isAllProductLoading && (
        <div className="my-12 main-container">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900">You May Also Like</h3>
            <p className="text-gray-500">Discover similar products</p>
          </div>
          <Collections products={products} />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
