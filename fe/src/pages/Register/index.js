/* eslint-disable react/jsx-one-expression-per-line */
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Card, Container } from './styles';
import AccountsService from '../../services/AccountsService';
import useErrors from '../../hooks/useErrors';
import FormGroup from '../../components/FormGroup';
import toast from '../../utils/toast';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';
import isEmailValid from '../../utils/isEmailValid';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submiting, setSubmiting] = useState(false);

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

  const handleChangeConfirmPassword = useCallback((event) => {
    setConfirmPassword(event.target.value);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const body = {
      email,
      password,
    };

    try {
      await AccountsService.createAccount(body);
      safeAsyncAction(() => {
        navigate('/login', { replace: true });
        toast({
          type: 'sucess',
          text: 'Nova conta cadastrada com sucesso!',
        });
      });
    } catch (error) {
      toast({
        type: 'danger',
        text: error.message,
      });
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
  }

  useEffect(() => {
    if (!email || !password || !confirmPassword) {
      setSubmiting(false);
    } else {
      setSubmiting(true);
    }
    if (confirmPassword !== password) {
      setError({ field: 'confirmPassword', message: 'As senhas não coincidem!' });
    } else {
      removeError('confirmPassword');
    }
  }, [confirmPassword]);

  return (
    <Container>
      <form>
        <Card>
          <h2>Registrar nova conta</h2>
          <span>Já possui uma conta? <Link to="/login">Clique aqui!</Link></span>
          <FormGroup error={getErrorMessageByFieldName('email')}>
            <Input
              placeholder="Email"
              error={getErrorMessageByFieldName('email')}
              value={email}
              onChange={handleChangeEmail}
            />
          </FormGroup>
          <FormGroup error={getErrorMessageByFieldName('password')}>
            <Input
              placeholder="Password"
              error={getErrorMessageByFieldName('password')}
              value={password}
              onChange={handleChangePassword}
              type="password"
            />
          </FormGroup>
          <FormGroup error={getErrorMessageByFieldName('confirmPassword')}>
            <Input
              placeholder="Confirm password"
              error={getErrorMessageByFieldName('confirmPassword')}
              value={confirmPassword}
              onChange={handleChangeConfirmPassword}
              type="password"
            />
          </FormGroup>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={errors.length !== 0 || !submiting}
          >
            Create
          </Button>
        </Card>
      </form>
    </Container>
  );
}
