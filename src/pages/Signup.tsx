import ScrollToTop from '@/components/ui/ToTop';
import { useLoginMutation, useSignupMutation } from '@/redux/api/authApi';
import {
  setUserInLocalState,
  useCurrentToken,
  useCurrentUser,
} from '@/redux/features/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { TCurrentUser } from '@/types/commonTypes';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { FaSignInAlt } from 'react-icons/fa';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Signup = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [role, setRole] = useState<string>('customer');
  const { register, handleSubmit } = useForm();
  const [login] = useLoginMutation();
  const [signup] = useSignupMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector(useCurrentToken);
  const currentUser = useAppSelector(useCurrentUser) as TCurrentUser;

  useEffect(() => {
    if (token) {
      navigate(`/dashboard/${currentUser?.role}/overview`);
    }
  }, [token, navigate]);

  const handleSignup = async (signupData: FieldValues) => {
    const { name, email, password } = signupData;

    signupData = {
      ...signupData,
      role,
    };

    if (!name || !email || !password || !role) {
      toast.error('All fields are required', {
        position: 'top-right',
        icon: '😢',
        duration: 1500,
      });
      return;
    } else if (password.length < 6 || !/\d/.test(password)) {
      toast.error(
        'Password should be at least 6 characters long and contain a number',
        {
          position: 'top-right',
          icon: '😢',
          duration: 2500,
        }
      );
    } else {
      const response = await signup(signupData).unwrap();
      if (response?.data?.email === email) {
        toast.success('Signup Successful', {
          position: 'top-right',
          icon: '👏',
          duration: 1500,
        });
        const response = await login({ email, password }).unwrap();
        const userFromDB = response?.data?.user;
        const accessToken = response?.data?.token;
        if (userFromDB && accessToken) {
          dispatch(
            setUserInLocalState({
              user: userFromDB,
              token: accessToken,
            })
          );
          setTimeout(() => {
            navigate(`/dashboard/${userFromDB?.role}/overview`);
          }, 500);
        }
      } else {
        toast.error('Signup Failed, try again please.', {
          position: 'top-right',
          icon: '😢',
          duration: 1500,
        });
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

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value);
  };

  return (
    <>
      <ScrollToTop />
      <div className="main-container flex justify-center items-center min-h-screen">
        <div
          className="shadow-lg pb-8 w-11/12 md:6/12 lg:w-5/12"
       
        >
          <div className="shadow py-3">
            <h3 className="text-custom-black text-xl font-bold ml-8">
              Create New Account
            </h3>
          </div>
          <div className="h-[2px] w-3/5 mb-6 bg-orange"></div>
          <div className="px-8">
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(handleSignup)}
            >
              <div>
                <h3 className="block mb-2 text-sm font-medium text-gray-900">
                  Role
                </h3>
                <ul className="items-center w-full text-sm font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded-lg sm:flex ">
                  <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                    <div className="flex items-center ps-3">
                      <input
                        id="horizontal-list-radio-license"
                        type="radio"
                        value="customer"
                        name="role"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                        onChange={handleRoleChange}
                        checked={role === 'customer'}
                      />
                      <label
                        htmlFor="horizontal-list-radio-license"
                        className="w-full py-3 ms-2 text-sm font-medium text-gray-900 "
                      >
                        Customer
                      </label>
                    </div>
                  </li>
                  <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r ">
                    <div className="flex items-center ps-3">
                      <input
                        id="horizontal-list-radio-id"
                        type="radio"
                        value="vendor"
                        name="role"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
                        onChange={handleRoleChange}
                        checked={role === 'vendor'}
                      />
                      <label
                        htmlFor="horizontal-list-radio-id"
                        className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Vendor
                      </label>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:outline-none"
                  placeholder="e.g. Babul Akter"
                  {...register('name')}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:outline-none"
                  placeholder="name@company.com"
                  {...register('email')}
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   focus:outline-none"
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
                <span>Sign Up</span>
              </button>
            </form>

            {/* not registered */}
            <div className="flex items-center justify-between mt-12">
              <p className="text-sm text-offgray">Already Registered?</p>
              <Link to="/login">
                <span className="text-sm hover:text-orange-400 hover:transition-all duration-300 underline text-offgray">
                  Go to SignIn
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
