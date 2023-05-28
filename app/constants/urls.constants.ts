export const checkUsername = (HOST: string, username: string) =>
  `${HOST}/users/usernameCheck/${username}`;

export const getEvents = (HOST: string, startTime: number, endTime: number) =>
  `${HOST}/events/calendar/${1}?startTime=${startTime}&endTime=${endTime}`;

export const patchEvent = (HOST: string, id: number) => `${HOST}/events/${id}`;

export const postEvent = (HOST: string) => `${HOST}/events/`;
