import { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Context } from '../Context/AuthContext';

export default function ProtectedRoute() {
  const { authenticated } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      navigate('/login');
    }
  }, [authenticated]);

  return (
    <Outlet />
  );
}
