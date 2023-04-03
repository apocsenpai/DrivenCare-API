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

async function findAppointmentsByPatientId({ id }) {
  return db.query(
    `
  SELECT a.date, a.time, d.name, d.specialty FROM appointments a
  JOIN patients p
  ON p.id = a.patient_id
  JOIN doctors d
  ON d.id = a.doctor_id
  WHERE a.patient_id = $1 AND a.date >= NOW() AND a.canceled = false
`,
    [id]
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
  WHERE a.patient_id = $1 AND a.date < NOW() AND a.canceled = false AND a.confirmed = true
`,
    [id]
  );
}

export default {
  create,
  findByEmail,
  findById,
  findAppointmentsByPatientId,
  findAppointmentsHistoric,
};
