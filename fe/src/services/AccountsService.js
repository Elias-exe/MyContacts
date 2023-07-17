import AccountMapper from './mappers/AccountMapper';
import HttpClient from './utils/HttpClient';

class AccountsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  createAccount(account) {
    const body = AccountMapper.toPersistence(account);
    return this.httpClient.post('/registerUser', { body });
  }

  loginAccount(account) {
    const body = AccountMapper.toPersistence(account);
    return this.httpClient.post('/signUp', { body });
  }
}
export default new AccountsService();
