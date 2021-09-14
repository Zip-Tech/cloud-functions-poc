import { logger } from '@config';

/**
 * @param promise
 */
export const catchError = async (promise: Promise<any>) => {
  try {
    return await promise;
  } catch (err) {
    logger.error(err);
    return err;
  }
};
