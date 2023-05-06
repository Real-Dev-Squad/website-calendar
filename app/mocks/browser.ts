// src/mocks/browser.js
import { setupWorker } from 'msw';
import { clientHandlers } from './handlers/clientHandler';

// This configures a Service Worker with the given request handlers.

export const worker = setupWorker(...clientHandlers);
