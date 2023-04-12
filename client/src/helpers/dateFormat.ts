export function formatDate(dateString: string) {
  const date = new Date(dateString);
  date.setHours(date.getHours()); // Add 1 hour for CET timezone
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${month} ${day}, ${year}, ${hours}:${minutes}`;
}
