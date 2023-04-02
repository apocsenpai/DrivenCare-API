import db from "../configs/db.js";

async function create({
  name,
  email,
  password,
  specialty,
  address,
  checkIn,
  checkOut,
}) {
  return db.query(
    `INSERT INTO doctors
    (name, email, password, specialty, address, checkIn, checkOut)
    VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [name, email, password, specialty, address, checkIn, checkOut]
  );
}

async function findByEmail({ email }) {
  return db.query(`SELECT * FROM doctors WHERE email = $1`, [email]);
}

async function findById(id) {
  return db.query(`SELECT id FROM doctors WHERE id = $1`, [id]);
}

export default { create, findByEmail, findById };
