import { useCallback, useEffect, useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Card, Container } from './styles';
import AccountsService from '../../services/AccountsService';
import useErrors from '../../hooks/useErrors';
import FormGroup from '../../components/FormGroup';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submiting, setSubmiting] = useState(false);

  const {
    errors,
    getErrorMessageByFieldName,
    removeError,
    setError,
  } = useErrors();

  function handleChangeEmail(event) {
    setEmail(event.target.value);
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
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

    await AccountsService.createAccount(body);
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
      <Card>
        <h2>Registrar nova conta</h2>
        <FormGroup error={getErrorMessageByFieldName('email')}>
          <Input
            placeholder="Email"
            value={email}
            onChange={handleChangeEmail}
          />
        </FormGroup>
        <FormGroup error={getErrorMessageByFieldName('password')}>
          <Input
            placeholder="Password"
            value={password}
            onChange={handleChangePassword}
            type="password"
          />
        </FormGroup>
        <FormGroup error={getErrorMessageByFieldName('confirmPassword')}>
          <Input
            placeholder="Confirm password"
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
    </Container>
  );
}
