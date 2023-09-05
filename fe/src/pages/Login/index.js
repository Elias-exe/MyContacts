/* eslint-disable react/jsx-one-expression-per-line */
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container } from './styles';

import FormGroup from '../../components/FormGroup';
import Input from '../../components/Input';
import Button from '../../components/Button';
import AccountsService from '../../services/AccountsService';
import { Context } from '../../Context/AuthContext';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';
import useErrors from '../../hooks/useErrors';
import isEmailValid from '../../utils/isEmailValid';
import toast from '../../utils/toast';

export default function Login() {
  const { authenticated, handleLogin } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const safeAsyncAction = useSafeAsyncAction();

  const {
    errors,
    getErrorMessageByFieldName,
    removeError,
    setError,
  } = useErrors();

  function handleChangeEmail(event) {
    setEmail(event.target.value);

    if (!event.target.value || !isEmailValid(event.target.value)) {
      setError(
        { field: 'email', message: 'Email inválido.' },
      );
    } else {
      removeError('email');
    }
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);

    if (!event.target.value) {
      setError(
        { field: 'password', message: 'Senha inválida!' },
      );
    } else {
      removeError('password');
    }
  }

  useEffect(() => {
    if (authenticated) {
      navigate('/home', { replace: true });
    }
  }, [authenticated, navigate, safeAsyncAction]);

  async function handleSubmit(event) {
    event.preventDefault();

    const body = {
      email,
      password,
    };
    try {
      const datas = await AccountsService.loginAccount(body);
      await handleLogin(datas.token);
    } catch (error) {
      toast(
        {
          type: 'danger',
          text: 'Dados inválidos',
        },
      );
      setEmail('');
      setPassword('');
    }
  }

  return (
    <Container>
      <h2>Entre em sua conta!</h2>
      <span>Não possui uma conta? Registre-se <Link to="/">clicando aqui!</Link>
      </span>
      <form>
        <FormGroup error={getErrorMessageByFieldName('email')}>
          <Input
            placeholder="Email"
            error={getErrorMessageByFieldName('email')}
            type="email"
            value={email}
            onChange={handleChangeEmail}
          />
        </FormGroup>
        <FormGroup error={getErrorMessageByFieldName('password')}>
          <Input
            placeholder="Password"
            error={getErrorMessageByFieldName('password')}
            type="password"
            value={password}
            onChange={handleChangePassword}
          />
        </FormGroup>
        <Button
          type="submit"
          disabled={errors.length > 0 || !email || !password}
          onClick={handleSubmit}
        >
          Entrar
        </Button>
      </form>
    </Container>
  );
}
