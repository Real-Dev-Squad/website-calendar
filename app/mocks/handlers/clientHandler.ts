import { rest } from 'msw';

const URL = window.ENV.API_HOST;

export const clientHandlers = [
  rest.get(`${URL}/users/usernameCheck/:username`, (req, res, ctx) =>
    res(ctx.json({ available: true })),
  ),
];
