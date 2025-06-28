import ScrollToTop from '@/components/ui/ToTop';
import { usePaymentCalculation } from '@/redux/features/paymentSlice';
import { useShoppingCartProducts } from '@/redux/features/shoppingCartSlice';
import { useAppSelector } from '@/redux/hook';
import { MdErrorOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';
import NotFound from './NotFound';

const OrderCancel = () => {
  const shoppingCartProducts = useAppSelector(useShoppingCartProducts);
  const payments = useAppSelector(usePaymentCalculation);

  if (
    shoppingCartProducts.length !== 0 ||
    payments?.cartProducts.length !== 0
  ) {
    return <NotFound />;
  }

  return (
    <div>
      <ScrollToTop />
      <div className="main-container">
        <div
          className="flex justify-center h-[75vh] items-center flex-col"
          data-aos="fade-down"
          data-aos-duration="1500"
        >
          <MdErrorOutline className="text-4xl text-red-700" />
          <h3 className="text-custom-black text-xl md:text-2xl font-semibold mt-6 text-center">
            Your order has been canceled !
          </h3>
          <p className="text-offgray text-sm md:w-7/12 lg:w-5/12 text-center mt-2">
            Your order has been canceled. If you have any questions, please
            contact our support team. Thank you!
          </p>
          <Link to={`/`}>
            <button className="py-2 lg:py-2.5 px-3 lg:px-6 rounded text-orange-400 font-semibold flex items-center justify-center gap-x-2 w-full mt-6 text-center text-nowrap border-2 border-orange-400 hover:bg-orange-400 hover:text-white transition-all duration-300">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderCancel;
