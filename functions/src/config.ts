import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
export const fbConfig = process.env.FIREBASE_CONFIG;

admin.initializeApp({
    projectId: 'cloud-functions-scaffold',
    databaseURL: 'https://cloud-functions-scaffold-default-rtdb.firebaseio.com'
});

export const db = admin.database();
export const fs = admin.firestore();
export const func = functions.region('asia-northeast1');
export const logger = functions.logger;
export const messaging = admin.messaging();
export const remoteConfig = admin.remoteConfig();

fs.settings({ ignoreUndefinedProperties: true });

export type Request = functions.https.Request;
export type Response = functions.Response;

// ENV
export const jwtSecret = functions.config().jwt.secret;