const AccountRepository = require('../repositories/AccountRepository');
const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(request, response) {
    const categories = await CategoriesRepository.findAll();
    return response.json(categories);
  }

  async store(request, response) {
    const { name, createdBy } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    if(!createdBy){
      return response.status(400).json({ error: 'CreatedBy is required' })
    }

    const email = await AccountRepository.findByEmail({ createdBy })

    if(!email){
      return response.status(400).json({ error: 'Email not found'})
    }

    const category = await CategoriesRepository.create({ name, createdBy });

    response.json(category);
  }
}
module.exports = new CategoryController();
