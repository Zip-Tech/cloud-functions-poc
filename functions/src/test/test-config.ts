/// <reference types="jest" />

import * as TestFunctions from 'firebase-functions-test';


const firebaseConfig = {
    projectId: 'cloud-functions-scaffold',
    databaseURL: 'https://cloud-functions-scaffold-default-rtdb.firebaseio.com'
};

const envConfig = { jwt: { secret: 'hg&^%&hjh^&5'} };

const fun = TestFunctions(firebaseConfig, 'service-account.json')

fun.mockConfig(envConfig);

export { fun };