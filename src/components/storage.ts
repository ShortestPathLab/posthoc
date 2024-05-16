export const get = (t: string) => {
  if (typeof window !== "undefined" && "localStorage" in window) {
    return localStorage.getItem(t);
  }
  return null;
};
export const set = (t: string, v: string) => {
  if (typeof window !== "undefined" && "localStorage" in window) {
    localStorage.setItem(t, v);
  }
};
