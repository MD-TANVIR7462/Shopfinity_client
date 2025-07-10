import ScrollToTop from '@/components/ui/ToTop';
import { useLoginMutation } from '@/redux/api/authApi';
import {
  setUserInLocalState,
  useCurrentToken,
} from '@/redux/features/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { FaSignInAlt } from 'react-icons/fa';
import { FaDatabase } from 'react-icons/fa6';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const { register, handleSubmit, setValue } = useForm();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector(useCurrentToken);

  useEffect(() => {
    fetch('https://shipfinity-backend.vercel.app/api/auth/verify-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data: any) => {
        if (data?.data !== true) {
          dispatch(setUserInLocalState({ user: null, token: null }));
        } else {
          navigate('/');
        }
      });
  }, [token, navigate, dispatch]);

  const handleLogin = async (loginData: FieldValues) => {
    if (!loginData?.email || !loginData?.password) {
      toast.error('Email or Password is missing', {
        position: 'top-right',
        icon: '😢',
        duration: 1500,
      });
    } else {
      const response = await login(loginData).unwrap();
      const userFromDB = response?.data?.user;
      const accessToken = response?.data?.token;

      if (userFromDB && accessToken) {
        toast.success('Login Successful', {
          position: 'top-right',
          icon: '👏',
          duration: 1500,
        });
        dispatch(
          setUserInLocalState({
            user: userFromDB,
            token: accessToken,
          })
        );
        setTimeout(() => {
          navigate('/');
        }, 500);
      }
    }
  };

  const toggleShowingPassword = () => {
    const passwordInput = document.getElementById(
      'password'
    ) as HTMLInputElement;
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      setIsPasswordVisible(true);
    } else {
      passwordInput.type = 'password';
      setIsPasswordVisible(false);
    }
  };

  const demoCredentials = {
    admin: { email: 'admin@gmail.com', password: 'myshopfinity2' },
    vendor: { email: 'tanvir.dev3@gmail.com', password: 'myshopfinity2' },
    customer: { email: 'customer@gmail.com', password: 'myshopfinity2' },
  };

  const handleFillCredentials = (role: 'admin' | 'vendor' | 'customer') => {
    const { email, password } = demoCredentials[role];
    setValue('email', email);
    setValue('password', password);
  };

  return (
    <>
      <div className="main-container flex justify-center items-center min-h-screen">
        <div
          className="shadow-lg pb-8 w-full md:6/12 lg:w-5/12"
       
        >
          <div className="shadow py-3">
            <h3 className="text-custom-black text-xl font-bold ml-8">
              Sign In
            </h3>
          </div>
          <div className="h-[2px] w-full mb-6 bg-orange"></div>
          <div className="px-8">
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(handleLogin)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500  focus:outline-none"
                  placeholder="name@company.com"
                  {...register('email')}
                />
              </div>
              <div className="relative">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <p className="text-sm cursor-pointer text-green-600">
                    Forgot Password?
                  </p>
                </div>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:outline-none"
                  {...register('password')}
                />
                <span
                  className="absolute cursor-pointer top-10 right-3"
                  onClick={toggleShowingPassword}
                >
                  {isPasswordVisible ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </span>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-orange font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center space-x-4 items-center"
              >
                <FaSignInAlt />
                <span>Sign In</span>
              </button>
            </form>

            {/* "Login as" Text with Horizontal Lines */}
            <div className="mt-8 flex items-center justify-center space-x-4">
              <hr className="flex-grow border-t-2 border-gray-300" />
              <p className="text-sm font-bold text-gray-600">
                Demo Credentials For
              </p>
              <hr className="flex-grow border-t-2 border-gray-300" />
            </div>

            {/* Buttons for demo login */}
            <div className="flex flex-col gap-y-4 mt-5 lg:flex-row lg:space-x-4 lg:justify-between">
              <button
                className="w-full py-2 border border-green-400 flex justify-center space-x-4 items-center hover:cursor-pointer hover:bg-green-400 text-offgray hover:text-white rounded"
                onClick={() => handleFillCredentials('customer')}
              >
                <span className="text-sm">
                  <FaDatabase />
                </span>
                <span className="ml-2 text-sm">Customer</span>
              </button>
              <button
                className="w-full py-2 border border-green-400 flex justify-center space-x-4 items-center hover:cursor-pointer hover:bg-green-400 text-offgray hover:text-white rounded"
                onClick={() => handleFillCredentials('vendor')}
              >
                <span className="text-sm">
                  <FaDatabase />
                </span>
                <span className="ml-2 text-sm">Vendor</span>
              </button>
              <button
                className="w-full py-2 border border-green-400 flex justify-center space-x-4 items-center hover:cursor-pointer hover:bg-green-400 text-offgray hover:text-white rounded"
                onClick={() => handleFillCredentials('admin')}
              >
                <span className="text-sm">
                  <FaDatabase />
                </span>
                <span className="ml-2 text-sm">Admin</span>
              </button>
            </div>

            {/* not registered */}
            <div className="flex items-center justify-between mt-12">
              <p className="text-sm text-offgray">Not Registered Yet?</p>
              <Link to="/signup">
                <span className="text-sm hover:text-green-400 hover:transition-all duration-300 underline text-offgray">
                  Go to Signup
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
