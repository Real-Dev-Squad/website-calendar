// src/mocks/browser.js
import { setupWorker } from 'msw';
import { handlers } from './handlers/handlers';

// This configures a Service Worker with the given request handlers.
console.log({ handlers });

export const worker = setupWorker(...handlers);
