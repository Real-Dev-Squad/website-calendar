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
