const handleAppointmentTime = (time) => {
  const [hour, minute] = time.split(":");

  return +hour >= 8 && +hour <= 17 && (+minute === 0 || +minute === 30);
};

export default handleAppointmentTime;