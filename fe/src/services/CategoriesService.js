import HttpClient from './utils/HttpClient';
import CategoryMapper from './mappers/CategoryMapper';

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient('https://mycontacts-api-4mqf.onrender.com');
  }

  async listCategories(signal, body) {
    const categories = await this.httpClient.get('/categories', { signal, body });
    return categories.map(CategoryMapper.toDomain);
  }

  createCategory(category) {
    const body = CategoryMapper.toPersistence(category);
    console.log(body);
    return this.httpClient.post('/categories', { body });
  }
}
export default new CategoriesService();
