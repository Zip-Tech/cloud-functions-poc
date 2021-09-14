import * as functions from 'firebase-functions';
import * as express from 'express'
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as csrf from 'csurf';
import * as helmet from 'helmet';

import { db } from '@config'
import * as auth from './auth/auth-jwt'
import { middleware } from './middleware/middleware';
import { router } from './generate/key'

export const csrfProtection = csrf({ cookie: true });

const app = express();
app.use(cookieParser());
app.disable('x-powered-by');
app.use(cors({ origin: true }));
app.use(helmet());
app.use(auth.default);
app.use(middleware.errorHandler);
app.use('/api', router);

export const generateKey = functions.https.onRequest(app);

export const storeKey = functions.https.onCall((data, context) => {
    const { key } = data;
    if (!key) throw new Error('Missing Test Key Data!')
    
    return db.ref('testKeys/').set(data)
})