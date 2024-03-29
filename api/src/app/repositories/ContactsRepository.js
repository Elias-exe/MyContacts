const db = require('../../database');

class ContactsRepository {
  async findAll(orderBy = 'ASC', createdBy) {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
    SELECT contacts.*, categories.name AS category_name
    FROM contacts
    LEFT JOIN categories ON categories.id = contacts.category_id
    WHERE contacts.created_by_email = $1
    ORDER BY contacts.name ${direction}`, [createdBy]);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
    SELECT contacts.*, categories.name AS category_name
    FROM contacts
    LEFT JOIN categories ON categories.id = contacts.category_id
    WHERE contacts.id=$1`, [id]);
    return row;
  }

  async findByEmail(email, created_by_email) {
    const [row] = await db.query(`
    SELECT *
    FROM contacts
    WHERE email = $1 AND created_by_email = $2`, [email, created_by_email]);
    return row;
  }

  async create({
    name, email, phone, category_id, created_by_email
  }) {
    const [row] = await db.query(`
    INSERT INTO contacts(name,email,phone, category_id,created_by_email)
    VALUES($1, $2, $3, $4, $5)
    RETURNING *
    `, [name, email, phone, category_id, created_by_email]);

    return row;
  }

  async update(id, {
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`
      UPDATE contacts
      SET name = $1, email= $2, phone = $3, category_id = $4
      WHERE id = $5
      RETURNING *
    `, [name, email, phone, category_id, id]);
    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM contacts WHERE id = $1 ', [id]);
    return deleteOp;
  }
}

module.exports = new ContactsRepository();
