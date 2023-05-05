import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { serverHandlers } from './handlers/serverHandler';

const server = setupServer(...serverHandlers);
export { server, rest };
