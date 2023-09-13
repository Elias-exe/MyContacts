const AccountRepository = require('../repositories/AccountRepository');
const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(request, response) {
    const { email } = request.body;

    const categories = await CategoriesRepository.findAll({ email });
    return response.json(categories);
  }

  async store(request, response) {
    const { name, created_by_email } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    if (!created_by_email) {
      return response.status(400).json({ error: 'CreatedBy is required' })
    }

    const email = created_by_email;

    const createdBy = await AccountRepository.findByEmail({ email })

    if (!createdBy) {
      return response.status(400).json({ error: 'Email not found' })
    }

    const category = await CategoriesRepository.create({ name, created_by_email });

    response.json(category);
  }
}
module.exports = new CategoryController();
