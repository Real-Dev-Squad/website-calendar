import { rest } from 'msw';
const URL = window.ENV.API_HOST;

export const clientHandlers = [
  // Handles a POST /login request
  rest.get(`${URL}/users/usernameCheck/:username`, (req, res, ctx) => {
    // Persist user's authentication in the session
    return res(ctx.json({ title: 'The Lord of the Rings' }));
  }),
];
