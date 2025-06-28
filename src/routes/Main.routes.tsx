import AboutUs from '@/pages/AboutUs';
import Checkout from '@/pages/Checkout';
import Faq from '@/pages/Faq';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import OrderCancel from '@/pages/OrderCancel';
import OrderFail from '@/pages/OrderFail';
import OrderSuccess from '@/pages/OrderSuccess';
import ProductDetails from '@/pages/ProductDetails';
import ResetPassword from '@/pages/ResetPassword';
import Shop from '@/pages/Shop';
import ShoppingCart from '@/pages/ShoppingCart';
import Signup from '@/pages/Signup';
import Support from '@/pages/Support';
import WishList from '@/pages/WishList';
import ProtectedRoute from './ProtectedRoute';

export const mainRoutePaths = [
  { index: true, element: <Home /> },
  { path: 'about-us', element: <AboutUs /> },
  { path: 'faq', element: <Faq /> },
  { path: 'shop', element: <Shop /> },
  { path: '/product/:id', element: <ProductDetails /> },
  { path: 'support', element: <Support /> },
  { path: 'login', element: <Login /> },
  { path: 'forgot-password', element: <ResetPassword /> },
  { path: 'signup', element: <Signup /> },
  {
    path: '/:id/wishlist',
    element: (
      <ProtectedRoute>
        <WishList />
      </ProtectedRoute>
    ),
  },
  {
    path: '/:id/shopping-cart',
    element: (
      <ProtectedRoute>
        <ShoppingCart />
      </ProtectedRoute>
    ),
  },
  {
    path: '/:id/check-out',
    element: (
      <ProtectedRoute>
        <Checkout />
      </ProtectedRoute>
    ),
  },
  {
    path: '/order-success',
    element: (
      <ProtectedRoute>
        <OrderSuccess />
      </ProtectedRoute>
    ),
  },
  {
    path: '/order-fail',
    element: (
      <ProtectedRoute>
        <OrderFail />
      </ProtectedRoute>
    ),
  },
  {
    path: '/order-cancel',
    element: (
      <ProtectedRoute>
        <OrderCancel />
      </ProtectedRoute>
    ),
  },
];
