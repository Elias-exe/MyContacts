const ContactsRepository = require('../repositories/ContactsRepository');
const isValidUUID = require('../utils/isValidUUID');

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query;
    const { createdBy } = request.body;
    const contacts = await ContactsRepository.findAll(orderBy, createdBy);

    response.setHeader('Access-Control-Allow-Origin', '*')
    response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;

    if(!isValidUUID(id)){
      return response.status(404).json({ error: 'Invalid contact id!' });
    }

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    response.json(contact);
  }

  async store(request, response) {
    const {
      name, email, phone, category_id, created_by_email
    } = request.body;

    if(category_id && !isValidUUID(category_id)){
      return response.status(404).json({ error: 'Invalid category id!' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    if (!created_by_email) {
      return response.status(400).json({ error: 'createdBy is required' });
    }

    const contactExists = await ContactsRepository.findByEmail(email, created_by_email);

    if(email){
      if (contactExists) {
        return response.status(400).json({ error: 'This e-mail is already been taken' });
      }
    }

    const contact = await ContactsRepository.create({
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
      created_by_email
    });

    response.status(201).json(contact);
  }

  async update(request, response) {
    const { id } = request.params;

    if(!isValidUUID(id)){
      return response.status(404).json({ error: 'Invalid contact id!' });
    }

    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    if(category_id && !isValidUUID(category_id)){
      return response.status(404).json({ error: 'Invalid category id!' });
    }

    const contactExists = await ContactsRepository.findById(id);

    if (!contactExists) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    const contactByEmail = await ContactsRepository.findByEmail(email);

    if(email){
      if (contactByEmail && contactByEmail.id !== id) {
        return response.status(400).json({ error: 'This e-mail is in use' });
      }
    }

    const contact = await ContactsRepository.update(id, {
      name,
      email: email|| null,
      phone,
      category_id: category_id || null,
    });
    response.json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;

    if(!isValidUUID(id)){
      return response.status(404).json({ error: 'Invalid contact id!' });
    }

    await ContactsRepository.delete(id);

    response.sendStatus(204);
  }
}

// Singleton
module.exports = new ContactController();
