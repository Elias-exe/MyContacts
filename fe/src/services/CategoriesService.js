import HttpClient from './utils/HttpClient';
import CategoryMapper from './mappers/CategoryMapper';

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listCategories(signal) {
    const categories = await this.httpClient.get('/categories', { signal });
    return categories.map(CategoryMapper.toDomain);
  }

  createCategory(category) {
    const body = CategoryMapper.toPersistence(category);
    return this.httpClient.post('/categories', { body });
  }
}
export default new CategoriesService();
