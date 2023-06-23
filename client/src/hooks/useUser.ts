export function useUser() {
  const id = /userId=([^;]*)/.exec(document.cookie)?.[1];
  return { id: "6491eeaa725b66c3fa8caf37" };
}
