const { Client } = require('pg');

const client = new Client({
  connectionString: `${process.env.DATABASE_URL}`
});
client.connect();

exports.query = async (query, values) => {
  const result = await client.query(query, values);
  return result.rows;
};
