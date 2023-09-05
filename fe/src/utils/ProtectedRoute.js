// import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { Outlet, useNavigate } from 'react-router-dom';
import Router from '../Router';
// import { Context } from '../Context/AuthContext';
import AccountsService from '../services/AccountsService';

export default function ProtectedRoute({ children }) {
  // const { authenticated } = useContext(Context);
  // const navigate = useNavigate();
  // console.log(authenticated);
  // useEffect(() => {
  //   if (!authenticated) {
  //     navigate('/login');
  //   }
  // }, [authenticated, navigate]);

  const Authenticated = AccountsService.loginAccount();
  console.log('usuarioAutenticado', Authenticated);
  return Authenticated ? children : <Router />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
