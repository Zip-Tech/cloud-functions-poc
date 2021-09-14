import * as functions from 'firebase-functions';
import { db } from './config/config'
import * as express from 'express'
import * as auth from './auth/auth-jwt'
import { middleware } from './middleware/middleware';
import { router } from './generate/key'

const app = express();

app.use(auth.default);
app.use(middleware.errorHandler);
app.use('/api', router);

export const generateKey = functions.https.onRequest(app);

export const storeKey = functions.https.onCall((data, context) => {
    const { key } = data;
    if (!key) throw new Error('Missing Test Key Data!')
    
    return db.ref('testKeys/').set(data)
})