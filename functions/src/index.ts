import * as functions from 'firebase-functions';
import * as express from 'express'
import * as auth from './auth/auth-jwt'
import * as middleware from './middleware/middleware';
import { router } from './generate/key'

const app = express();

app.use(auth.default)
app.use(middleware.default.errorHandler)
app.use('/api', router)

export const generateKey = functions.https.onRequest(app);
