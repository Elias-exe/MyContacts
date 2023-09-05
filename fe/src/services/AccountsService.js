import AccountMapper from './mappers/AccountMapper';
import HttpClient from './utils/HttpClient';

class AccountsService {
  constructor() {
    this.httpClient = new HttpClient('https://mycontacts-api-4mqf.onrender.com');
  }

  async createAccount(account) {
    const body = AccountMapper.toPersistence(account);
    const response = await this.httpClient.post('/registerUser', { body });
    return response;
  }

  async loginAccount(account) {
    const body = AccountMapper.toPersistence(account);
    const response = await this.httpClient.post('/signUp', { body });
    return response;
  }
}
export default new AccountsService();
