import { useState } from 'react';
import { Container } from './styles';

import FormGroup from '../../components/FormGroup';
import Input from '../../components/Input';
import Button from '../../components/Button';
import AccountsService from '../../services/AccountsService';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const body = {
      email,
      password,
    };

    try {
      await AccountsService.loginAccount(body);
    } catch {
      console.log('error');
    }
  }

  return (
    <Container>
      <h2>Entre em sua conta!</h2>
      <FormGroup>
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={handleEmail}
        />
      </FormGroup>
      <FormGroup>
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={handlePassword}
        />
      </FormGroup>
      <Button
        type="submit"
        disabled={!email || !password}
        onClick={handleSubmit}
      >
        Entrar
      </Button>
    </Container>
  );
}
