import HttpClient from './utils/HttpClient';

class TokenService {
  constructor() {
    this.httpClient = new HttpClient('https://mycontacts-api-4mqf.onrender.com');
  }

  generateToken() {
    return this.httpClient.post('/user/generateToken');
  }

  validateToken(headers) {
    return this.httpClient.get('/user/validateToken', { headers });
  }
}
export default new TokenService();
