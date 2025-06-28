import ScrollToTop from '@/components/ui/ToTop';
import { useCurrentUser } from '@/redux/features/authSlice';
import { usePaymentCalculation } from '@/redux/features/paymentSlice';
import { useShoppingCartProducts } from '@/redux/features/shoppingCartSlice';
import { useAppSelector } from '@/redux/hook';
import { TCurrentUser } from '@/types/commonTypes';
import { Link } from 'react-router-dom';
import checkcircle from '../assets/images/CheckCircle.png';
import stack from '../assets/images/Stack.png';
import NotFound from './NotFound';

const OrderSuccess = () => {
  const currentUser = useAppSelector(useCurrentUser) as TCurrentUser;
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
          <img
            src={checkcircle}
            alt="check-circle"
            className="w-12 md:w-20 h-12 md:h-20"
          />
          <h3 className="text-custom-black text-xl md:text-2xl font-semibold mt-6 text-center">
            Your order has been successfully placed!
          </h3>
          <p className="text-offgray text-sm md:w-7/12 lg:w-5/12 text-center mt-2">
            Pellentesque sed lectus nec tortor tristique accumsan quis dictum
            risus. Donec volutpat mollis nulla non facilisis.
          </p>
          <Link to={`/dashboard/${currentUser?.role}/manage-orders`}>
            <button className="py-2 lg:py-2.5 px-3 lg:px-6 rounded text-orange-400 font-semibold flex items-center justify-center gap-x-2 w-full mt-6 text-center text-nowrap border-2 border-orange-400 hover:bg-orange-400 hover:text-white transition-all duration-300">
              <img src={stack} alt="stack" className="w-5 h-5" />
              View Orders
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
