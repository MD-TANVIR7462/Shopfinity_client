import {
  setUserInLocalState,
  useCurrentUser,
} from '@/redux/features/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { TUser } from '@/types/commonTypes';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const CheckRoleAndLogout = (userRole: string) => {
  const user = useAppSelector(useCurrentUser);
  const { role } = user as TUser;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      if (role !== userRole) {
        try {
          const response = await fetch(
            'http://localhost:5000/api/auth/logout',
            {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          if (response.status === 200) {
            dispatch(
              setUserInLocalState({
                user: null,
                token: null,
              })
            );
            navigate('/login');
          } else {
            toast.error('Something went wrong', {
              position: 'top-right',
              duration: 1500,
            });
          }
        } catch (error) {
          console.error('Something went wrong', error);
        }
      }
    };

    logout();
  }, [role, navigate]);
};

export default CheckRoleAndLogout;
