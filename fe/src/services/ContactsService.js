import ContactMapper from './mappers/ContactMapper';
import HttpClient from './utils/HttpClient';

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listContacts(orderBy, signal) {
    const contact = await this.httpClient.get(`/contacts/?orderBy=${orderBy || 'asc'}`, { signal });
    return contact.map(ContactMapper.toDomain);
  }

  async getContactById(id, signal) {
    const contact = await this.httpClient.get(`/contacts/${id}`, { signal });
    return ContactMapper.toDomain(contact);
  }

  editContact(id, contact) {
    const body = ContactMapper.toPersistence(contact);
    return this.httpClient.put(`/contacts/${id}`, { body });
  }

  createContact(contact) {
    const body = ContactMapper.toPersistence(contact);
    return this.httpClient.post('/contacts', { body });
  }

  deleteContact(id) {
    return this.httpClient.delete(`/contacts/${id}`);
  }
}
export default new ContactsService();
