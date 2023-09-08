const db = require('../../database/index');

class CategoriesRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM categories ORDER BY name');
    return rows;
  }

  async create({ name, createdBy }) {
    const [row] = await db.query(`
    INSERT INTO categories (name, createdBy)
    VALUES($1, $2)
    RETURNING *`, [name, createdBy]);
    return row;
  }
}

module.exports = new CategoriesRepository();
