function isCorrectAvailability({ checkIn, checkOut }) {
  const [checkInHour] = checkIn.split(":");
  const [checkOutHour] = checkOut.split(":");

  return (
    +checkInHour >= 8 &&
    +checkOutHour <= 18 &&
    checkIn.length === 5 &&
    checkOut.length === 5
  );
}

export default isCorrectAvailability;
