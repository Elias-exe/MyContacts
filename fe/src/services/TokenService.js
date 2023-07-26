import HttpClient from './utils/HttpClient';

class TokenService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  generateToken() {
    return this.httpClient.post('/user/generateToken');
  }

  validateToken(headers) {
    return this.httpClient.get('/user/validateToken', { headers });
  }
}
export default new TokenService();
