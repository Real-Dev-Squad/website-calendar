import axios from 'axios';

export const isUsernameAvailable = async (host: string, username: string) => {
  const url = `${host}/api/v1/users/usernameCheck/${username}`;
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data.data.available;
  } catch (error) {
    console.error('err', error);
    return error;
  }
};
