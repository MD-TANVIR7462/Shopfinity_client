import ScrollToTop from '@/components/ui/ToTop';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { FaSignInAlt } from 'react-icons/fa';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

const ResetPassword = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');
  const { register, handleSubmit } = useForm();
  const router = useNavigate();

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

  const handleResetPassword = async (newpass: FieldValues) => {
    const newPassword = newpass.newPassword;
    if (newPassword.length < 6 || !/\d/.test(newPassword)) {
      toast.error(
        'Password should be at least 6 characters long and contain a number',
        {
          position: 'top-right',
          icon: '😢',
          duration: 2500,
        }
      );
      return;
    }

    try {
      const response = await fetch(
        'https://gizmobuy-backend.vercel.app/api/auth/reset-forgotten-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userEmail: email, newPassword }),
        }
      );

      const data = await response.json();

      if (data?.statusCode === 200 && data?.data?.email === email) {
        toast.success(data?.message, {
          position: 'top-right',
          icon: '🚀',
          duration: 2500,
        });
        router('/login');
      } else {
        toast.error(data?.message, {
          position: 'top-right',
          icon: '😢',
          duration: 1500,
        });
      }
    } catch (error) {
      toast.error('An error occurred, please try again', {
        position: 'top-right',
        icon: '😢',
        duration: 2500,
      });
    }
  };

  return (
    <>
      <ScrollToTop />
      <div className="main-container flex justify-center items-center min-h-screen">
        <div
          className="shadow-lg pb-8 w-11/12 md:6/12 lg:w-5/12"
          data-aos="zoom-in"
          data-aos-duration="2000"
        >
          <div className="shadow py-3">
            <h3 className="text-custom-black text-xl font-bold ml-8">
              Set New Password
            </h3>
          </div>
          <div className="h-[2px] w-3/5 mb-6 bg-orange"></div>
          <div className="px-8">
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(handleResetPassword)}
            >
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   focus:outline-none"
                  {...register('newPassword')}
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
                <span>Reset Password</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
