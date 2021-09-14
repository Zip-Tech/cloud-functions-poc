import * as jwt from 'jsonwebtoken'
import { Request, Response } from "express";

export default (request: Request, response: Response, next: any) => {
    const key = request.get('Authorization');
    auth(response, key)
    next()
}

export const auth = (response: Response, key?: string) => {
    if (!key) {
        response.statusCode = 400
        response.send({ message: 'No Authentication Provided' })
    } else {
        verifyJWT(key)
    }
}

export const verifyJWT = (key: string, response?: Response) => {
    try {
        const keypair = key.split(' ')
        return jwt.verify(keypair[1], 'D*F-JaNdRgUkXp2s5v8y/B?E(H+KbPeS')
    } catch (error) {
        throw new Error('Invalid Signature')
    }
}
