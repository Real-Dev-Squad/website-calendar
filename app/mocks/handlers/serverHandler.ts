import { rest } from 'msw';

const URL = process.env.API_HOST;

export const serverHandlers = [
  // this is a dummy request,exists on client we will change it in further PR's
  rest.get(`${URL}/users/usernameCheck/:username`, (req, res, ctx) =>
    res(ctx.json({ available: true })),
  ),
];
