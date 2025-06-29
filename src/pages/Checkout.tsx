import ScrollToTop from '@/components/ui/ToTop';
import { useCurrentUser } from '@/redux/features/authSlice';
import {
  ClearPaymentInfoAfterMakingOrder,
  usePaymentCalculation,
} from '@/redux/features/paymentSlice';
import {
  MakeShoppingCartEmpty,
  useShoppingCartProducts,
} from '@/redux/features/shoppingCartSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { TCurrentUser, TPaymentProduct } from '@/types/commonTypes';

import { useCreateOrderMutation } from '@/redux/api/orderApi';
import { useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import NotFound from './NotFound';

const Checkout = () => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [mobile, setMobile] = useState('');
  const [ainfo, setAinfo] = useState('');
  const [loading, setLoading] = useState(false);

  const formData = {
    address,
    city,
    state,
    postalCode,
    country,
    mobile,
  };

  const { id } = useParams<{ id: string }>();
  const currentUser = useAppSelector(useCurrentUser) as TCurrentUser;
  const shoppingCartProducts = useAppSelector(useShoppingCartProducts);
  const payments = useAppSelector(usePaymentCalculation);
  const dispatch = useAppDispatch();
  const [createOrder] = useCreateOrderMutation();

  const generatedOrderId = `${Math.floor(
    Math.random() * 999
  )}${currentUser?.email.slice(0, 7)}${Date.now().toString().slice(7, 11)}`;

  if (
    id !== currentUser._id ||
    shoppingCartProducts.length === 0 ||
    payments?.cartProducts.length === 0
  ) {
    return <NotFound />;
  }

  const handlePayment = async (data: any) => {
    if (currentUser?.role !== 'customer') {
      toast.error(
        'You are not authorized to place order. Please login with customer account.',
        {
          position: 'top-right',
          icon: '🚫',
          duration: 3000,
        }
      );
      return;
    }

    let orderData = {};

    if (
      address.trim().length < 2 ||
      city.trim().length < 2 ||
      state.trim().length < 2 ||
      postalCode.trim().length < 3 ||
      country.trim().length < 3 ||
      mobile.trim().length < 6
    ) {
      toast.error('Please fill all the shipping information forms properly.', {
        position: 'top-right',
        icon: '😢',
        duration: 1500,
      });
      return;
    } else {
      setLoading(true);
      orderData = {
        orderId: generatedOrderId,
        customerName: currentUser.name,
        orderBy: currentUser.email,
        products: payments.cartProducts.map((product: TPaymentProduct) => {
          return {
            id: product.productId,
            title: product.productTitle,
            price: product.productPrice,
            quantity: product.quantity,
            billForThisProduct: product.productPrice * product.quantity,
          };
        }),
        shippingInfo: data,
        paymentInfo: {
          method: 'sslcommerz',
          amount: payments.totalToBePaid,
        },
        isPaid: false,
        orderStatus: 'processing',
        billForThisOrder: payments.subtotal,
        appliedCoupon: payments.appliedCoupon,
        discountGiven: payments.discount,
        totalBill: payments.totalToBePaid,
      };
    }

    const response = await createOrder(orderData).unwrap();

    if (response?.data) {
      window.location.replace(response.data);
      setAinfo('');
      setAddress('');
      setCity('');
      setCountry('');
      setMobile('');
      setPostalCode('');
      setState('');
      setMobile('');
      setLoading(false);
      dispatch(ClearPaymentInfoAfterMakingOrder());
      dispatch(MakeShoppingCartEmpty());
    } else {
      toast.error('Failed to place order. Please try again!', {
        position: 'top-right',
        duration: 3000,
        icon: '🚫',
      });
      setLoading(false);
    }
  };

  return (
    <div>
      <ScrollToTop />
      <div className="main-container mt-12 md:mt-16 mb-8 lg:mb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-y-0 md:gap-x-2 lg:gap-x-6 ">
          <div
            className="col-span-12 md:col-span-7 lg:col-span-8"
            data-aos="fade-down"
            data-aos-duration="1500"
          >
            {/* billing information */}
            <h4 className="text-custom-black font-semibold py-3">
              Billing Information
            </h4>
            <form className="grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-x-6  items-center">
              <div className="col-span-12 md:col-span-6">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500  focus:outline-none cursor-not-allowed"
                  placeholder={currentUser?.name}
                  disabled={true}
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500  focus:outline-none cursor-not-allowed"
                  placeholder={currentUser?.email}
                  disabled={true}
                />
              </div>
              <div className="col-span-12">
                <label
                  htmlFor="ainfo"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Additional Information
                </label>
                <input
                  type="text"
                  id="ainfo"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 lg:py-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500  focus:outline-none"
                  placeholder="Gift message, special delivery instructions, etc."
                  value={ainfo}
                  onChange={(e) => setAinfo(e.target.value)}
                />
              </div>
            </form>
            {/* shipping information */}
            <h4 className="text-custom-black font-semibold py-3 mt-8 md:mt-10 lg:mt-14">
              Shipping Information
            </h4>
            <form className="grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-x-6  items-center">
              <div className="col-span-12 md:col-span-6">
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500  focus:outline-none"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. 123 Main St"
                  required={true}
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <label
                  htmlFor="city"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500  focus:outline-none"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. New York"
                  required={true}
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <label
                  htmlFor="state"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500  focus:outline-none"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="e.g. NY"
                  required={true}
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <label
                  htmlFor="postalCode"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500  focus:outline-none"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="e.g. 10001"
                  required={true}
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <label
                  htmlFor="country"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500  focus:outline-none"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="e.g. United States"
                  required={true}
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <label
                  htmlFor="mobile"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mobile
                </label>
                <input
                  type="text"
                  id="mobile"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500  focus:outline-none"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="e.g. +1 123 456 7890"
                  required={true}
                />
              </div>
            </form>
            {/* payment information */}
            <h4 className="text-custom-black font-semibold pt-3 mt-8 md:mt-10 lg:mt-14">
              Payment Info
            </h4>
            <p className="text-sm text-red-400 font-bold mb-3">
              (I am using free tier of sslcommerz payment gateway as it's a
              personal project. There is some limitation of it, like user have
              to click on 'success' button to pay. When it will be paid project,
              I will use paid tier of sslcommerz and everything will work like a
              charm. Thanks for understanding.)
            </p>
            <form className="mb-10">
              <input
                type="radio"
                id="sslcommerz"
                className="mr-2"
                checked={true}
                onChange={() => console.log('')}
              />
              <label htmlFor="sslcommerz" className="mb-2">
                Pay with SSLCommerz
              </label>
            </form>
          </div>
          <div className="col-span-12 md:col-span-5 lg:col-span-4 flex flex-col gap-y-6">
            {/* order summary */}
            <div
              className="shadow rounded px-4"
              data-aos="fade-down"
              data-aos-duration="1500"
            >
              <h4 className="text-custom-black font-semibold py-3 px-4 lg:px-0">
                Order Summary
              </h4>
              {/* products */}
              <div className="flex flex-col gap-y-6 pb-5 lg:mt-2">
                {payments?.cartProducts.map((product: TPaymentProduct) => (
                  <div
                    key={product?.productId}
                    className="flex justify-between items-center"
                  >
                    <div className="flex gap-x-6 items-center">
                      <img
                        src={product?.productImage}
                        alt={product?.productTitle}
                        className="w-10 h-10 object-contain"
                      />
                      <div>
                        <h5 className="text-custom-black text-sm font-semibold">
                          {product?.productTitle.length > 60
                            ? `${product?.productTitle.slice(0, 150)}${'...'}`
                            : product?.productTitle}
                        </h5>
                        <p className="text-[#528b30] text-sm">
                          {product.quantity} x ${product?.productPrice}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* order summary details */}
              <div className="flex flex-col gap-y-3 pb-5">
                <div className="flex justify-between items-center px-4 lg:px-2 mt-2 pb-2">
                  <h5 className="text-sm text-pure-gray">Sub-total</h5>
                  <h5 className="text-sm text-custom-black font-semibold">{`$${payments?.subtotal.toFixed(
                    2
                  )}`}</h5>
                </div>
                <div className="flex justify-between items-center px-4 lg:px-2 mt-2 pb-2">
                  <h5 className="text-sm text-pure-gray">Shipping</h5>
                  <h5 className="text-sm text-custom-black font-semibold">
                    {`$0.00`}
                  </h5>
                </div>
                <div className="flex justify-between items-center px-4 lg:px-2 mt-2 pb-2">
                  <h5 className="text-sm text-pure-gray">Discount</h5>
                  <h5 className="text-sm text-custom-black font-semibold">
                    {`$${payments?.discount.toFixed(2)}`}
                  </h5>
                </div>
                <div className="flex justify-between items-center px-4 lg:px-2 mt-2 border-b border-gray-300 pb-5">
                  <h5 className="text-sm text-pure-gray">Tax</h5>
                  <h5 className="text-sm text-custom-black font-semibold">
                    {`$0.00`}
                  </h5>
                </div>
                <div className="flex justify-between items-center px-4 lg:px-2 mt-3">
                  <h5 className="text-sm text-pure-gray font-semibold">
                    Total
                  </h5>

                  <h5 className="text-sm text-custom-black font-semibold">
                    {`$${payments?.totalToBePaid.toFixed(2)}`}
                  </h5>
                </div>
                <button
                  className={`bg-orange py-2 lg:py-2.5 px-3 lg:px-6 rounded text-white font-semibold flex items-center justify-center gap-x-2 hover:bg-green-700 w-full mt-4 text-center text-nowrap disabled:opacity-50`}
                  onClick={() => handlePayment(formData)}
                  disabled={loading}
                >
                  Place Order <FaArrowRightLong />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
