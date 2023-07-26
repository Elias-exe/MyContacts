import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import TokenService from '../services/TokenService';

const Context = createContext();

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');

      if (token) {
        const headers = {
          Authorization: `${JSON.parse(token)}`,
        };

        await TokenService.validateToken(headers);
        setAuthenticated(true);
      }
      setLoading(false);
    })();
  }, []);

  async function handleLogin(datas) {
    localStorage.setItem('token', JSON.stringify(datas));
    try {
      const headers = {
        Authorization: `${datas}`,
      };
      await TokenService.validateToken(headers);
      setAuthenticated(true);
    } catch (error) {
      console.log(error);
    }
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem('token');
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
