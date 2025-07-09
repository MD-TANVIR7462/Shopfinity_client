/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import ScrollToTop from "@/components/ui/ToTop";
import { useCurrentUser } from "@/redux/features/authSlice";
import { CalculateAmountToBePaid } from "@/redux/features/paymentSlice";
import { RemoveCartProductFromLocalState, useShoppingCartProducts } from "@/redux/features/shoppingCartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { TCurrentUser, TProduct } from "@/types/commonTypes";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { FaArrowRightLong } from "react-icons/fa6";
import { PiEyeLight } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import NotFound from "./NotFound";

const ShoppingCart = () => {
  const { id } = useParams<{ id: string }>();
  const currentUser = useAppSelector(useCurrentUser) as TCurrentUser;
  const [subtotal, setSubtotal] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [couponToBeApplied, setCouponToBeApplied] = useState<string>("");
  const [appliedCoupon, setAppliedCoupon] = useState<string>("");

  const coupons = [
    {
      code: "eid2025",
      discount: 7,
    },
    {
      code: "blackfriday2025",
      discount: 13,
    },
  ];

  if (id !== currentUser._id) {
    return <NotFound />;
  }
  const dispatch = useAppDispatch();
  const shoppingCartProducts = useAppSelector(useShoppingCartProducts);

  const removeFromShoppingCart = (product: TProduct) => {
    dispatch(RemoveCartProductFromLocalState(product));
    toast.success("Product removed from shopping cart", {
      position: "top-right",
      duration: 1500,
      icon: "🤔",
    });
  };

  const [productQuantities, setProductQuantities] = useState<{
    [productId: string]: number;
  }>(
    shoppingCartProducts.reduce<{ [productId: string]: number }>((acc, product) => {
      acc[product._id] = 1;
      return acc;
    }, {})
  );

  const updateProductQuantity = (productId: string, quantity: number) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  const calculateAppliedDiscount = (coupon: string) => {
    // check if coupns array includes the coupon code that user entered
    const appliedCoupon = coupons.find((c) => c.code === coupon);

    if (appliedCoupon) {
      if (discount !== 0) {
        toast.error("You have already applied a coupon code", {
          position: "top-right",
          duration: 1500,
          icon: "🤔",
        });
        setCouponToBeApplied("");
        return;
      }

      const totalDiscount = (subtotal * appliedCoupon.discount) / 100;
      setDiscount(totalDiscount);
      setTotal(subtotal - totalDiscount);
      toast.success(
        `Coupon ${appliedCoupon.code} applied successfully and you got ${appliedCoupon.discount}% discount.`,
        {
          position: "top-right",
          duration: 1500,
          icon: "🤔",
        }
      );
      setCouponToBeApplied("");
    } else {
      toast.error("Invalid coupon code", {
        position: "top-right",
        duration: 1500,
        icon: "🤔",
      });
      setCouponToBeApplied("");
      return;
    }
  };

  // set subtotal, discount and total in local storage
  useEffect(() => {
    const userAppliedCoupon = coupons.find((c) => c.code === appliedCoupon);
    if (userAppliedCoupon) {
      const totalDiscount = (subtotal * userAppliedCoupon.discount) / 100;
      setDiscount(totalDiscount);
      setTotal(subtotal - totalDiscount);
    }
    let total = 0;
    shoppingCartProducts.forEach((product: TProduct) => {
      total += product.price * productQuantities[product._id];
    });
    setSubtotal(total);
    setTotal(subtotal - discount);
  }, [shoppingCartProducts, productQuantities, subtotal, discount, total, couponToBeApplied, appliedCoupon]);

  // set payment for checkout page
  useEffect(() => {
    dispatch(
      CalculateAmountToBePaid({
        cartProducts: shoppingCartProducts.map((product: TProduct) => ({
          productId: product._id,
          productImage: product.displayImage,
          productTitle: product.title,
          quantity: productQuantities[product._id],
          productPrice: product.price,
          billForThisProduct: product.price * productQuantities[product._id],
        })),
        appliedCoupon: appliedCoupon,
        discount,
        subtotal,
        totalToBePaid: total,
      })
    );
  }, [shoppingCartProducts, productQuantities, discount, total, appliedCoupon, subtotal]);

  return (
    <div>
      <ScrollToTop />
      {shoppingCartProducts.length > 0 ? (
        <div className="main-container">
          <div className="lg:w-6/12 lg:mx-auto mt-8 shadow rounded-full px-3 py-2">
            <Marquee pauseOnHover={true}>
              {coupons.map((coupon) => {
                return (
                  <h4 key={coupon.code} className="ml-5 md:ml-3 lg:ml-2 mr-10 lg:mr-20">
                    Apply coupon code <span className="text-green font-semibold">{coupon.code}</span> to get{" "}
                    <span className="text-green font-semibold">{coupon.discount}% discount</span> on your total
                    purchase.
                  </h4>
                );
              })}
            </Marquee>
          </div>
        </div>
      ) : null}
      <div className="main-container mt-12 md:mt-16 mb-8 lg:mb-20 px-4">
        {shoppingCartProducts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Cart Table */}
            <div className="lg:col-span-7">
              <div className="w-full overflow-x-auto shadow-md border border-gray-200 rounded-md">
                <table className="min-w-[700px] w-full text-sm text-gray-700">
                  <thead className="uppercase bg-gray-50 text-gray-500 text-xs tracking-wide border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 hidden lg:table-cell">Image</th>
                      <th className="pl-2 lg:px-6 py-3 text-center lg:text-left">Product</th>
                      <th className="px-4 py-3 text-center">Price</th>
                      <th className="px-4 py-3 text-center">Quantity</th>
                      <th className="px-4 py-3 text-center">Sub-Total</th>
                      <th className="px-4 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shoppingCartProducts.map((product: TProduct) => (
                      <tr key={product._id} className="bg-white border-b hover:bg-green-50 transition duration-200">
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <img
                            src={product.displayImage}
                            alt={product.title}
                            className="w-14 h-14 object-contain rounded-md shadow-sm"
                          />
                        </td>
                        <td className="px-3 py-4 font-medium">{product?.title}</td>
                        <td className="px-4 py-4 text-center font-semibold text-gray-600">${product.price}</td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex items-center justify-center border border-gray-300 rounded-md w-fit px-2 py-1 gap-3 bg-gray-50">
                            <button
                              onClick={() =>
                                productQuantities[product._id] > 1
                                  ? updateProductQuantity(product._id, productQuantities[product._id] - 1)
                                  : null
                              }
                              className="text-gray-600 hover:text-black transition"
                            >
                              –
                            </button>
                            <span className="font-semibold text-gray-700">{productQuantities[product._id]}</span>
                            <button
                              onClick={() => updateProductQuantity(product._id, productQuantities[product._id] + 1)}
                              className="text-gray-600 hover:text-black transition"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center font-semibold text-gray-700">
                          ${Math.floor(product.price * productQuantities[product._id]).toFixed(2)}
                        </td>
                        <td className="px-4 py-4 flex justify-center items-center gap-2">
                          <Link to={`/product/${product?._id}`} title="View details">
                            <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full">
                              <PiEyeLight className=" text-green-500 hover:text-green-600 w-5 h-5" />
                            </button>
                          </Link>
                          <button
                            onClick={() => removeFromShoppingCart(product)}
                            title="Remove from cart"
                           className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
                          >
                            <RxCross2 className="w-5 h-5 text-red-500 hover:text-red-600 transition" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right: Cart Total and Coupon */}
            <div className="lg:col-span-5 space-y-6">
              {/* Cart Total */}
              <div className="shadow rounded px-4 py-5 bg-white" data-aos="fade-down" data-aos-duration="1000">
                <h4 className="text-custom-black font-semibold text-lg mb-4">Cart Total</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h5 className="text-sm text-pure-gray">Sub-total</h5>
                    <h5 className="text-sm text-custom-black font-semibold">${subtotal.toFixed(2)}</h5>
                  </div>
                  <div className="flex justify-between items-center">
                    <h5 className="text-sm text-pure-gray">Shipping</h5>
                    <h5 className="text-sm text-custom-black font-semibold">$0.00</h5>
                  </div>
                  <div className="flex justify-between items-center">
                    <h5 className="text-sm text-pure-gray">Discount</h5>
                    <h5 className="text-sm text-custom-black font-semibold">${discount.toFixed(2)}</h5>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-300 pb-3">
                    <h5 className="text-sm text-pure-gray">Tax</h5>
                    <h5 className="text-sm text-custom-black font-semibold">$0.00</h5>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <h5 className="text-sm text-pure-gray font-semibold">Total</h5>
                    <h5 className="text-sm text-custom-black font-semibold">${total.toFixed(2)}</h5>
                  </div>
                  <Link to={`/${currentUser?._id}/check-out`}>
                    <button className="bg-orange py-2 lg:py-2.5 px-4 lg:px-6 rounded text-white font-semibold w-full mt-4 flex items-center justify-center gap-2 hover:bg-green-700 transition">
                      Proceed to checkout <FaArrowRightLong />
                    </button>
                  </Link>
                </div>
              </div>

              {/* Coupon Code */}
              <div className="shadow rounded px-4 py-5 bg-white" data-aos="fade-down" data-aos-duration="1500">
                <h4 className="text-custom-black font-semibold text-lg mb-4">Coupon Code</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Enter your coupon code"
                    className="border border-gray-200 rounded py-2.5 px-3 text-sm w-full focus:outline-none"
                    value={couponToBeApplied}
                    onChange={(e) => setCouponToBeApplied(e.target.value)}
                  />
                  <button
                    className="bg-deep-bluish py-2 lg:py-2.5 px-4 lg:px-6 rounded text-white font-semibold w-full sm:w-fit hover:bg-green-700 transition-all duration-300"
                    onClick={() => {
                      calculateAppliedDiscount(couponToBeApplied);
                      setAppliedCoupon(couponToBeApplied);
                    }}
                  >
                    Apply Coupon
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-96" data-aos="zoom-in" >
            <h4 className="text-2xl font-semibold text-custom-black text-center">Your shopping cart is empty</h4>
            <Link to="/shop">
              <button className="bg-orange text-white py-2 px-4 rounded mt-4">Shop Now</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
