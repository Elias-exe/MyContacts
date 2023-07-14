import AccountMapper from './mappers/AccountMapper';
import HttpClient from './utils/HttpClient';

class AccountsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  createAccount(account) {
    const body = AccountMapper.toPersistence(account);
    return this.httpClient.post('/account', { body });
  }
}
export default new AccountsService();
