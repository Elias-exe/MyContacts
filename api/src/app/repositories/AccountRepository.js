const db = require("../../database/index");

class AccountRepository{
  async listAccounts(){
    const rows = await db.query("SELECT * FROM accounts")
    return rows;
  }

  async findByEmail({email}){
    const [row] = await db.query(
      `SELECT * FROM accounts WHERE email = $1`,
       [email]);
    return row;
  }

  async createAccount({email,password}){
    const [newAccount] = await db.query(`
      INSERT INTO accounts (email,password)
      VALUES($1,$2)
      RETURNING *`, [email,password]);
      return newAccount;
  }
}

module.exports = new AccountRepository();
