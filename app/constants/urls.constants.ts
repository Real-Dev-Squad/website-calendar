export const checkUsername = (URL: string, username: string) =>
  `${URL}/users/usernameCheck/${username}`;

export const getEvents = (HOST: string, startTime: number, endTime: number) =>
  `${HOST}/events/calendar/${1}?startTime=${startTime}&endTime=${endTime}`;
