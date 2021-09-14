import * as admin from 'firebase-admin';


admin.initializeApp({
    projectId: 'cloud-functions-scaffold',
    databaseURL: 'https://cloud-functions-scaffold-default-rtdb.firebaseio.com'
});

export const db = admin.database();
export const fs = admin.firestore();