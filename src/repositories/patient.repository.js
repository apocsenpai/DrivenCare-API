import db from "../configs/db.js";

async function create({ name, email, password }) {
  return db.query(
    `INSERT INTO patients (name, email, password) VALUES ($1, $2, $3)`,
    [name, email, password]
  );
}

async function findByEmail({ email }) {
  return db.query(`SELECT * FROM patients WHERE email = $1`, [email]);
}

export default { create, findByEmail };
