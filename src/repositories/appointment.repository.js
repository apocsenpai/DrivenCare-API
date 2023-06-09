import db from "../configs/db.js";

async function findByDateAndTime({ date, time, doctorId }) {
  return db.query(
    `
    SELECT a.date, a.time, d.name, d.specialty
    FROM appointments a
    JOIN doctors d
    ON a.doctor_id = d.id
    WHERE
    a.doctor_id = $3 and
    a.date = $1 and
    (a.time BETWEEN $2::time - interval '29 minutes'
    AND $2::time + interval '29 minutes')
    `,
    [date, time, doctorId]
  );
}
async function create({ doctorId, patientId, date, time }) {
  return db.query(
    `
    INSERT INTO appointments (doctor_id, patient_id, date, time)
    VALUES ($1, $2, $3, $4)`,
    [doctorId, patientId, date, time]
  );
}

async function updateConfirmed({ appointmentId, doctorId }) {
  return db.query(`
  UPDATE appointments
  SET confirmed = true
  WHERE id = $1 AND doctor_id = $2 `, [
    appointmentId,
    doctorId,
  ]);
}

async function updateCanceled({ appointmentId, doctorId }) {
  return db.query(`
  UPDATE appointments
  SET canceled = true, confirmed = false
  WHERE id = $1 AND doctor_id = $2 `, [
    appointmentId,
    doctorId,
  ]);
}

export default { findByDateAndTime, create, updateConfirmed, updateCanceled };
