import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TokenService from '../services/TokenService';
import toast from '../utils/toast';

const Context = createContext();
function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');

      if (token) {
        const headers = {
          Authorization: `${JSON.parse(token)}`,
        };

        try {
          await TokenService.validateToken(headers);
          setAuthenticated(true);
        } catch {
          localStorage.removeItem('token');
          navigate('/');
          toast(
            {
              type: 'danger',
              text: 'Sessão expirada',
            },
          );
        }
      }
      setLoading(false);
    })();
  }, [navigate]);

  async function handleLogin(datas) {
    try {
      const headers = {
        Authorization: `${datas}`,
      };
      await TokenService.validateToken(headers);
      localStorage.setItem('token', JSON.stringify(datas));
      setAuthenticated(true);
      navigate('/home');
    } catch (error) {
      localStorage.removeItem('token');
    }
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <Context.Provider value={{
      loading, authenticated, handleLogin, handleLogout,
    }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
