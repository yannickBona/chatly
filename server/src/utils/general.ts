export const logger = {
  info: (message: string, ...args: any) => {
    console.log(`[INFO ${formatDateTime()}] ${message} ${args}`);
  },
  error: (message: string, ...args: any) => {
    console.error(`[ERROR ${formatDateTime()}] ${message} ${args}`);
  },
  warn: (message: string, ...args: any) => {
    console.warn(`[WARN ${formatDateTime()}] ${message} ${args}`);
  },
};

/**
 *
 * @returns the current formatted datetime
 */
function formatDateTime() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const gmtDate = new Date(now.getTime() + offset * 60 * 1000);
  const formattedDate = gmtDate
    .toISOString()
    .replace("T", " ")
    .substring(0, 19);
  return formattedDate;
}
