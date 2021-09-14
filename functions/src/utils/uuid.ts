import { Request, Response } from '@config';
import { customAlphabet, nanoid } from 'nanoid/async';
import { v1, v4, v5, validate, version } from 'uuid';

/**
 * uuidv1
 *
 * Create a version 1 (timestamp) UUID
 * https://www.npmjs.com/package/uuid#uuidv1options-buffer-offset
 */
export const uuidv1 = () => v1();

/**
 * uuidv4
 *
 * Create a version 4 (random) UUID
 * https://www.npmjs.com/package/uuid#uuidv4options-buffer-offset
 */
export const uuidv4 = () => v4();

/**
 * uuidv5
 *
 * Create a version 5 (namespace w/ SHA-1) UUID
 * https://www.npmjs.com/package/uuid#uuidv5name-namespace-buffer-offset
 * @param url
 * @param type
 */
export const uuidv5 = (url: string, type: string = v5.URL) => v5(url, type);

/**
 * uuidValidate
 *
 * Test a string to see if it is a valid UUID
 * https://www.npmjs.com/package/uuid#uuidvalidatestr
 * @param id
 */
export const uuidValidate = (id: string) => validate(id);

/**
 * uuidVersion
 *
 * Test a string to see if it is a valid UUID
 * https://www.npmjs.com/package/uuid#uuidversionstr
 * @param id
 */
export const uuidVersion = (id: string) => version(id);

/**
 * nanoidSecure
 *
 * To generate hardware random bytes, CPU collects electromagnetic noise.
 * In the synchronous API during the noise collection, the CPU is busy and cannot do anything useful in parallel.
 * https://www.npmjs.com/package/nanoid#async
 * @param size
 */
export const nanoidSecure = async (size = 21) => {
  try {
    return await nanoid(size);
  } catch (error) {
    return error;
  }
};

/**
 * customAlphabetSecure
 *
 * allows you to create nanoid with your own alphabet and ID size.
 * https://www.npmjs.com/package/nanoid#custom-alphabet-or-size
 * @param alphaNumeric
 * @param size
 */
export const customAlphabetSecure = async (
  alphaNumeric = '1234567890abcdef',
  size: number = 10
) => {
  try {
    const _nanoid = customAlphabet(alphaNumeric, size);
    return await _nanoid();
  } catch (error) {
    return error;
  }
};

export const testUUIDs = async () => {
  return {
    uuidv1: uuidv1(),
    uuidv4: uuidv4(),
    uuidv5: uuidv5('https://zipeli.com'),
    uuidValidate: uuidValidate('f4351120-a6fc-11eb-90f5-f314e82f2834'),
    uuidVersion1: uuidVersion('f4351120-a6fc-11eb-90f5-f314e82f2834'),
    uuidVersion4: uuidVersion('1dc4602d-d535-4332-9510-2549996cf3a6'),
    uuidVersion5: uuidVersion('9978bb85-af1c-5765-97c9-b665bc8c1ae4'),
    nanoidSecure21: await nanoidSecure(),
    nanoidSecure12: await nanoidSecure(12),
    nanoidSecure32: await nanoidSecure(32),
    customAlphabetSecure: await customAlphabetSecure(),
    customAlphabetSecureNumeric12: await customAlphabetSecure('1234567890', 12),
    customAlphabetSecureNumeric32: await customAlphabetSecure('1234567890', 32),
  };
};

export default async (request: Request, response: Response) => {
  response.send(await testUUIDs());
};
