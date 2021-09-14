import { func } from '@config';

export const uuid = func.https.onRequest(async (request, response) => {
  await (await import('./uuid')).default(request, response);
});

export const utils = {
  uuid
};
