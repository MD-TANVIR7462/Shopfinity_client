/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import ScrollToTop from '@/components/ui/ToTop';
import { useCurrentUser } from '@/redux/features/authSlice';
import { CalculateAmountToBePaid } from '@/redux/features/paymentSlice';
import {
  RemoveCartProductFromLocalState,
  useShoppingCartProducts,
} from '@/redux/features/shoppingCartSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { TCurrentUser, TProduct } from '@/types/commonTypes';
import { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { FaArrowRightLong } from 'react-icons/fa6';
import { PiEyeLight } from 'react-icons/pi';
import { RxCross2 } from 'react-icons/rx';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import NotFound from './NotFound';

const ShoppingCart = () => {
  const { id } = useParams<{ id: string }>();
  const currentUser = useAppSelector(useCurrentUser) as TCurrentUser;
  const [subtotal, setSubtotal] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [couponToBeApplied, setCouponToBeApplied] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<string>('');

  const coupons = [
    {
      code: 'eid2025',
      discount: 7,
    },
    {
      code: 'blackfriday2025',
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
    toast.success('Product removed from shopping cart', {
      position: 'top-right',
      duration: 1500,
      icon: '🤔',
    });
  };

  const [productQuantities, setProductQuantities] = useState<{
    [productId: string]: number;
  }>(
    shoppingCartProducts.reduce<{ [productId: string]: number }>(
      (acc, product) => {
        acc[product._id] = 1;
        return acc;
      },
      {}
    )
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
        toast.error('You have already applied a coupon code', {
          position: 'top-right',
          duration: 1500,
          icon: '🤔',
        });
        setCouponToBeApplied('');
        return;
      }

      const totalDiscount = (subtotal * appliedCoupon.discount) / 100;
      setDiscount(totalDiscount);
      setTotal(subtotal - totalDiscount);
      toast.success(
        `Coupon ${appliedCoupon.code} applied successfully and you got ${appliedCoupon.discount}% discount.`,
        {
          position: 'top-right',
          duration: 1500,
          icon: '🤔',
        }
      );
      setCouponToBeApplied('');
    } else {
      toast.error('Invalid coupon code', {
        position: 'top-right',
        duration: 1500,
        icon: '🤔',
      });
      setCouponToBeApplied('');
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
  }, [
    shoppingCartProducts,
    productQuantities,
    subtotal,
    discount,
    total,
    couponToBeApplied,
    appliedCoupon,
  ]);

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
  }, [
    shoppingCartProducts,
    productQuantities,
    discount,
    total,
    appliedCoupon,
    subtotal,
  ]);

  return (
    <div>
      <ScrollToTop />
      {shoppingCartProducts.length > 0 ? (
        <div className="main-container">
          <div className="lg:w-6/12 lg:mx-auto mt-8 shadow rounded-full px-3 py-2">
            <Marquee pauseOnHover={true}>
              {coupons.map((coupon) => {
                return (
                  <h4
                    key={coupon.code}
                    className="ml-5 md:ml-3 lg:ml-2 mr-10 lg:mr-20"
                  >
                    Apply coupon code{' '}
                    <span className="text-orange font-semibold">
                      {coupon.code}
                    </span>{' '}
                    to get{' '}
                    <span className="text-orange font-semibold">
                      {coupon.discount}% discount
                    </span>{' '}
                    on your total purchase.
                  </h4>
                );
              })}
            </Marquee>
          </div>
        </div>
      ) : null}
      <div className="main-container mt-12 md:mt-16 mb-8 lg:mb-20">
        {/* cart products */}
        {shoppingCartProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-y-0 md:gap-x-2 lg:gap-x-6 ">
            <div
              className="col-span-12 md:col-span-7 lg:col-span-8 h-fit shadow rounded"
              data-aos="fade-down"
              data-aos-duration="1500"
            >
              <h4 className="text-custom-black font-semibold py-3 px-4 lg:px-6">
                Shopping Cart
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
                        Quantity
                      </th>
                      <th scope="col" className="px-4 lg:px-6 py-3 text-center">
                        Sub-Total
                      </th>
                      <th scope="col" className="px-4 lg:px-6 py-3 text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {shoppingCartProducts.map((product: TProduct) => (
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
                        <td className="lg:px-6 py-4 md:py-8 lg:py-4 flex justify-center">
                          <div className="flex justify-between items-center border border-gray-200 py-[9px] px-2 w-16 md:w-20 rounded-md">
                            <button
                              onClick={() =>
                                productQuantities[product._id] > 1
                                  ? updateProductQuantity(
                                      product._id,
                                      productQuantities[product._id] - 1
                                    )
                                  : null
                              }
                              className="font-medium"
                            >
                              -
                            </button>
                            <span className="text-gray-600 font-semibold">
                              {productQuantities[product._id]}
                            </span>
                            <button
                              onClick={() =>
                                updateProductQuantity(
                                  product._id,
                                  productQuantities[product._id] + 1
                                )
                              }
                              className="font-medium"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td
                          scope="row"
                          className="lg:px-6 py-4 text-pure-gray text-sm font-semibold text-center"
                        >
                          {`$${Math.floor(
                            product.price * productQuantities[product._id]
                          ).toFixed(2)}`}
                        </td>
                        <td className="lg:px-6 md:py-4 flex md:space-x-2 justify-center items-center mt-4 md:mt-5">
                          <Link to={`/product/${product?._id}`}>
                            <button
                              className="md:border border-gray-300 p-1 rounded-full text-orange"
                              title="view details"
                            >
                              <PiEyeLight className="md:text-orange md:text-sm " />
                            </button>
                          </Link>
                          <button
                            className="text-gray-500 p-1 text-sm"
                            title="remove from wishlist"
                            onClick={() => removeFromShoppingCart(product)}
                          >
                            <RxCross2 className="text-[22px] md:border border-gray-300 p-1 rounded-full -mt-0.5 text-orange" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-span-12 md:col-span-5 lg:col-span-4 flex flex-col gap-y-6">
              {/* cart total */}
              <div
                className="shadow rounded px-4"
                data-aos="fade-down"
                data-aos-duration="1500"
              >
                <h4 className="text-custom-black font-semibold py-3 px-4">
                  Cart Total
                </h4>
                <div className="flex flex-col gap-y-3 pb-5">
                  <div className="flex justify-between items-center px-4 mt-2 pb-2">
                    <h5 className="text-sm text-pure-gray">Sub-total</h5>
                    <h5 className="text-sm text-custom-black font-semibold">{`$${subtotal.toFixed(
                      2
                    )}`}</h5>
                  </div>
                  <div className="flex justify-between items-center px-4 mt-2 pb-2">
                    <h5 className="text-sm text-pure-gray">Shipping</h5>
                    <h5 className="text-sm text-custom-black font-semibold">
                      {`$0.00`}
                    </h5>
                  </div>
                  <div className="flex justify-between items-center px-4 mt-2 pb-2">
                    <h5 className="text-sm text-pure-gray">Discount</h5>
                    <h5 className="text-sm text-custom-black font-semibold">
                      {`$${discount.toFixed(2)}`}
                    </h5>
                  </div>
                  <div className="flex justify-between items-center px-4 mt-2 border-b border-gray-300 pb-5">
                    <h5 className="text-sm text-pure-gray">Tax</h5>
                    <h5 className="text-sm text-custom-black font-semibold">
                      {`$0.00`}
                    </h5>
                  </div>
                  <div className="flex justify-between items-center px-4 mt-3">
                    <h5 className="text-sm text-pure-gray font-semibold">
                      Total
                    </h5>
                    <h5 className="text-sm text-custom-black font-semibold">
                      {`$${total.toFixed(2)}`}
                    </h5>
                  </div>
                  <Link to={`/${currentUser?._id}/check-out`}>
                    <button className="bg-orange py-2 lg:py-2.5 px-3 lg:px-6 rounded text-white font-semibold flex items-center justify-center gap-x-2 hover:bg-orange-500 w-full mt-4 text-center text-nowrap">
                      Proceed to checkout <FaArrowRightLong />
                    </button>
                  </Link>
                </div>
              </div>
              {/* coupon code */}
              <div
                className="shadow rounded px-4"
                data-aos="fade-down"
                data-aos-duration="1500"
              >
                <h4 className="text-custom-black font-semibold py-3 px-4">
                  Coupon Code
                </h4>
                <div className="flex flex-col gap-y-3 pb-5 px-4">
                  <input
                    type="text"
                    placeholder="Enter your coupon code"
                    className="border border-gray-200 rounded py-2.5 px-3 text-sm focus:outline-none"
                    value={couponToBeApplied}
                    onChange={(e) => setCouponToBeApplied(e.target.value)}
                  />
                  <button
                    className="bg-deep-bluish py-2 lg:py-2.5 px-3 lg:px-6 rounded text-white font-semibold flex items-center justify-center gap-x-2 hover:bg-orange-500 w-[180px] text-center transition-all duration-300"
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
          <div
            className="flex flex-col items-center justify-center h-96 md:h-72 lg:h-96"
            data-aos="zoom-in"
            data-aos-duration="1500"
          >
            <h4 className="text-2xl font-semibold text-custom-black">
              Your shopping cart is empty
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

export default ShoppingCart;
