export function getCookie(cookieName: string) {
  const cookies = document.cookie.split("; ");

  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === cookieName) {
      return value;
    }
  }

  return null;
}
