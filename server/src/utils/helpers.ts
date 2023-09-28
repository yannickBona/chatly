/**
 * This file contains helpers functions
 */

export const logger = {
  info: (message: string, ...args: unknown[]) => {
    console.log(`[INFO ${formatDateTime()}] ${message} ${args}`);
  },
  error: (message: string, ...args: unknown[]) => {
    console.error(`[ERROR ${formatDateTime()}] ${message} ${args}`);
  },
  warn: (message: string, ...args: unknown[]) => {
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
