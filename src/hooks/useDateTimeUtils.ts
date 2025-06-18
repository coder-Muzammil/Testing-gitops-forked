function useDateTimeUtils() {
  const secondsToTimeString = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const secondsTo12HourTimeString = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const ampm = hours >= 12 ? "PM" : "AM";

    const hours12 = hours % 12 || 12;

    return `${hours12.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")} ${ampm}`;
  };

  const formatTime = (time: string) => {
    return new Intl.DateTimeFormat("default", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(new Date(time));
  };

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("default", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  };

  const getFormattedDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${String(year)}`;
  };

  const extractTimeFromDateString = (date: string) => {
    return date.split("T")[1].split(".")[0].split("+")[0];
  };

  function getStartAndEndTime(time: string) {
    const [hours, minutes, seconds, period] = time.split(/[:\s]/);

    const hour24 =
      (parseInt(hours, 10) % 12) + (period.toUpperCase() === "PM" ? 12 : 0);

    const createTimeObject = (offsetMinutes: number) => {
      const date = new Date();
      date.setHours(
        hour24,
        parseInt(minutes, 10) + offsetMinutes,
        parseInt(seconds, 10),
      );
      return date;
    };

    const formatThisTime = (date: Date) => {
      const hrs = date.getHours().toString().padStart(2, "0");
      const mins = date.getMinutes().toString().padStart(2, "0");
      return `${hrs}:${mins}`;
    };

    const startTime = createTimeObject(-1);
    const endTime = createTimeObject(1);

    return {
      startTime: formatThisTime(startTime),
      endTime: formatThisTime(endTime),
    };
  }

  const formatTimeToAmPm = (timeString: string) => {
    // Split the time string into hours and minutes
    const [hour, minute] = timeString.split(":").map(Number);

    // Determine AM or PM
    const amPm = hour >= 12 ? "PM" : "AM";

    // Convert 24-hour format to 12-hour format
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;

    // Return the formatted time string
    return `${String(formattedHour)}:${minute.toString().padStart(2, "0")} ${amPm}`;
  };

  const secondsTo12HourTimeFormat = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const ampm = hours >= 12 ? "PM" : "AM";

    const hours12 = hours % 12 || 0;

    return `${hours12.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")} ${ampm}`;
  };
  return {
    secondsToTimeString,
    secondsTo12HourTimeString,
    formatTime,
    getFormattedDate,
    formatDate,
    extractTimeFromDateString,
    getStartAndEndTime,
    formatTimeToAmPm,
    secondsTo12HourTimeFormat,
  };
}

export default useDateTimeUtils;
