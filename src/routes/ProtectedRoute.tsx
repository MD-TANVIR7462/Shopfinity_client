import {
  setUserInLocalState,
  useCurrentToken,
} from '@/redux/features/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { ReactNode, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();

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
          dispatch(setUserInLocalState({ shopkeeper: null, token: null }));
        }
      });
  }, [token]);

  if (!token) {
    return <Navigate state={location.pathname} to="/login" replace={true} />;
  }

  return children as JSX.Element;
};

export default ProtectedRoute;
