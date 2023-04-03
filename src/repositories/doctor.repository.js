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

async function findAppointmentsByDoctorId({ id }) {
  return db.query(
    `
    SELECT a.date, a.time, p.name, d.specialty FROM appointments a
    JOIN patients p
    ON p.id = a.patient_id
    JOIN doctors d
    ON d.id = a.doctor_id
    WHERE a.doctor_id = $1 AND a.date >= NOW() AND a.canceled = false
  `,
    [id]
  );
}

async function findAll() {
  return db.query(`
    SELECT name, specialty, address
    FROM doctors
  `);
}

async function findByParams({ name, specialty, address }) {
  return db.query(
    `
    SELECT name, specialty, address
    FROM doctors
    WHERE name ILIKE $1
    OR specialty ILIKE $2
    OR address ILIKE $3
  `,
    [`%${name}%`, `%${specialty}%`, `%${address}%`]
  );
}

async function findAppointmentsHistoric({ id }) {
  return db.query(
    `
  SELECT a.date, a.time, d.name, d.specialty FROM appointments a
  JOIN patients p
  ON p.id = a.patient_id
  JOIN doctors d
  ON d.id = a.doctor_id
  WHERE a.doctor_id = $1 AND a.date < NOW() AND a.canceled = false AND a.confirmed = true
`,
    [id]
  );
}

export default {
  create,
  findByEmail,
  findById,
  findAppointmentsByDoctorId,
  findAll,
  findByParams,
  findAppointmentsHistoric
};
