/**
    Returns an array with time strings in the format "HH:MM" between the start and end time with the given interval.

    Example:
    getTimeStringArray(8, 11, 30)

    Returns:
    [
        "08:00",
        "08:30",
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
    ]
*/
export function getTimeStringArray(
  startTime: number = 6,
  endTime: number = 19,
  interval: number = 30
) {
  const timeStringArray = [];

  for (let i = startTime; i <= endTime; i++) {
    for (let j = 0; j < 60; j += interval) {
      const hour = i.toString().padStart(2, "0");
      const minute = j.toString().padStart(2, "0");
      timeStringArray.push(`${hour}:${minute}`);
    }
  }

  timeStringArray.pop();

  return timeStringArray;
}

/**
 *
 * @param time String in the format "HH:MM"
 * @param date Date object to get the year, month and day
 * @returns Date object with the same year, month and day as the given date and the hours and minutes from the time string
 */
export function convertTimeStringToDate(time: string, date: Date) {
  const [hours, minutes] = time.split(":").map(Number);

  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hours,
    minutes
  );
}

/**
 *
 * @param date Date object
 * @returns String in the format "HH:MM"
 */
export function convertDateToTimeString(date: Date | undefined) {
  if (!date) return "";
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}
