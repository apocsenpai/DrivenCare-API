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

async function findById(id) {
  return db.query(`SELECT id FROM patients WHERE id = $1`, [id]);
}

export default { create, findByEmail, findById };
