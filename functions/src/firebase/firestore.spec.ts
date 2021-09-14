import * as functions from "firebase-functions-test";
import * as admin from "firebase-admin";
import * as api from '../index'
import { v4 } from 'uuid';
import { db } from '../config/config';


const projectConfig = {
    projectId: 'cloud-functions-scaffold',
    databaseURL: 'https://cloud-functions-scaffold-default-rtdb.firebaseio.com'
};

const testEnv = functions(projectConfig);

describe('firestore testing', () => {

    let adminStub: any;
    jest.setTimeout(10000)

    // let mockRequest: Partial<Request>
    // let mockResponse: Partial<Response>;
    // let responseObject: any;

    beforeAll(() => {
        adminStub = jest.spyOn(admin, 'initializeApp');
        testEnv.cleanup();
    })

    afterAll(() => {
        // clean things up
        adminStub.mockRestore();
        testEnv.cleanup();
        // reset our database
        admin.database().ref('testKeys').remove();
    });

    test('database', async () => {

        const wrapped = testEnv.wrap(api.storeKey);

        const key = v4();

        const testKey = {
            key: key
        };

        await wrapped(testKey);

        const createdKey = await db
            .ref(`testKeys/`)
            .once('value');

        expect((createdKey).val()).toHaveProperty('key', testKey.key);
    })
    test('cloud function should throw error', async () => {
        const wrapped = testEnv.wrap(api.storeKey);
        const testKey = {};
        expect(() => {wrapped(testKey);}).toThrow(new Error('Missing Test Key Data!'));
    })

})
