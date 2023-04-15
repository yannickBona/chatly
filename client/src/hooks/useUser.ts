export function useUser() {
  const id = /userId=([^;]*)/.exec(document.cookie)?.[1];
  return { id: id };
}
