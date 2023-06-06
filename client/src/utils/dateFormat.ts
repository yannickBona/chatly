export function formatDate(dateString: string | undefined) {
  if (!dateString) return "";
  const date = new Date(dateString);
  date.setHours(date.getHours() - 2); // Subtract 2 hour for CET timezone
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
  const hours = date.getHours().toString().padStart(2, "0"); // Pad hours with leading zero if necessary
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Pad minutes with leading zero if necessary

  return `${month} ${day}, ${year}, ${hours}:${minutes}`;
}
