export function useUser() {
  const id = document.cookie.match(/userId=(?<id>[^;]+);?$/)?.groups?.id;
  return { id: id };
}
