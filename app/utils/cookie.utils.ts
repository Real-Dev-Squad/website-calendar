export const parseCookie = (str: string) =>
  str
    .split(';')
    .map((v) => v.split('='))
    .reduce((acc, val) => {
      const key = decodeURIComponent(val[0].trim());
      const camelKey = key.replace(/-./g, (x) => x[1].toUpperCase());
      const value = decodeURIComponent(val[1].trim());
      acc[camelKey] = value;
      return acc;
    }, {} as Record<string, string>);

const clearCookie = (cookieName: string) => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const clearCookies = () => {
  clearCookie('rcal-session');
  clearCookie('username');
  clearCookie('calendar-id');
};
