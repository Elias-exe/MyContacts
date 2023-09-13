const db = require('../../database/index');

class CategoriesRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM categories ORDER BY name');
    return rows;
  }

  async create({ name, email }) {
    const [row] = await db.query(`
    INSERT INTO categories (name, categories.created_by_email)
    VALUES($1, $2)
    RETURNING *`, [name, email]);
    return row;
  }
}

module.exports = new CategoriesRepository();
