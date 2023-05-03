import { rest } from 'msw';
const URL = process.env.API_HOST;

export const serverHandlers = [
  // Handles a POST /login request
  rest.get(`${URL}/users/usernameCheck/:username`, (req, res, ctx) => {
    // Persist user's authentication in the session
    return res(ctx.json({ title: 'The Lord of the Rings' }));
  }),
];
