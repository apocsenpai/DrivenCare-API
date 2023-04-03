const handleAppointmentTime = ({ time, checkin, checkout }) => {
  const [hour, minute] = time.split(":");
  const [minimumHour] = checkin.split(":");
  const [maximumHour] = checkout.split(":");

  return +hour >= +minimumHour && +hour < +maximumHour && (+minute === 0 || +minute === 30);
};

export default handleAppointmentTime;
