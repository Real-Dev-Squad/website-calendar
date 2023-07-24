export const checkUsername = (HOST: string, username: string) =>
  `${HOST}/users/usernameCheck/${username}`;

export const getUserSelfData = (HOST: string) => `${HOST}/users/self`;
export const getUserCalendarId = (HOST: string, username: string) => `${HOST}/calendar/${username}`;
export const getEvents = (HOST: string, calendarId:number, startTime: number, endTime: number) =>
  `${HOST}/events/calendar/${calendarId}?startTime=${startTime}&endTime=${endTime}`;

export const getEventById = (HOST: string, id: number) => `${HOST}/events/${id}`;

export const patchEvent = (HOST: string, id: number) => `${HOST}/events/${id}`;

export const postEvent = (HOST: string) => `${HOST}/events/`;
