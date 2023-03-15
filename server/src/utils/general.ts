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
  const gmtDate = new Date(now.getTime());
  const formattedDate = gmtDate
    .toISOString()
    .replace("T", " ")
    .substring(0, 19);
  return formattedDate;
}