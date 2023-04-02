import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";

dayjs.extend(customParseFormat);


const handleAppointmentDate = (date) => {
  const isValidDate = dayjs().isBefore(dayjs(date, "DD/MM/YYYY"));

  const weekDay = dayjs(date, "DD/MM/YYYY").$W;
  const isValidWeekDay = weekDay >= 1 && weekDay <= 5;
  
  return isValidDate && isValidWeekDay;
};

export default handleAppointmentDate;
