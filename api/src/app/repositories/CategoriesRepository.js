const db = require('../../database/index');

class CategoriesRepository {
  async findAll({ email }) {
    const rows = await db.query(`
    SELECT categories.* FROM categories
    WHERE categories.created_by_email = $1
    ORDER BY name`, [email]);
    return rows;
  }

  async create({ name, created_by_email }) {
    const [row] = await db.query(`
    INSERT INTO categories (name, created_by_email)
    VALUES($1, $2)
    RETURNING *`, [name, created_by_email]);
    return row;
  }
}

module.exports = new CategoriesRepository();
