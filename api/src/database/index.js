const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 32768,
  user: 'postgres',
  password: 'postgrespw',
  database: 'mycontacts',
});

client.connect();

exports.query = async (query, values) => {
  const result = await client.query(query, values);
  return result.rows;
};
