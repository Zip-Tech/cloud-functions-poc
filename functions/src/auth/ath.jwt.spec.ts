import { Request, Response } from "express";
import * as authenticate from './auth-jwt'
import { verifyJWT, auth } from './auth-jwt';
import * as jwt from 'jsonwebtoken'

interface customRequest extends Request {
    Authorization?:string;
}

describe('key', () => {
    let mockRequest: Partial<customRequest>
    let mockResponse: Partial<Response>;
    
    const invalidKey = '';
    const validKey = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsInN1YmplY3QiOiJhcGkiLCJpc3N1ZXIiOiJ6aXBlbGkiLCJpYXQiOjE1MTYyMzkwMjJ9.eyJJc3N1ZXIiOiJJc3N1ZXIiLCJJc3N1ZWQgQXQiOiIyMDIxLTA5LTEwVDE1OjUyOjIxLjg0MFoiLCJFeHBpcmF0aW9uIjoiMjAyMS0wOS0xMFQxNTo1MjoyMS44NDBaIiwiVXNlcm5hbWUiOiJKYXZhSW5Vc2UiLCJSb2xlIjoiQWRtaW4ifQ.y33XwCYMEVUYW-9Mho3aN15un0yhp5z6pyVNFF5hWMc';
    const keypair = validKey.split(' ');
    const verified = jwt.verify(keypair[1], 'D*F-JaNdRgUkXp2s5v8y/B?E(H+KbPeS');

    beforeEach(() => {
        mockRequest = {
            get: jest.fn()
        };
        mockResponse = {
            statusCode: 0,
            send: jest.fn(),
        }
    });
    
    test('should return code 400 when passed an invalid key', () => {
        const expectedStatusCode = 400;
        auth(mockResponse as Response, invalidKey)
        expect(mockResponse.statusCode).toBe(expectedStatusCode);
    });

    test('shoudld verify jwt when Authorization was provided', () => {
        expect(auth(mockResponse as Response, validKey)).toBe(undefined);
    });

    test('it should call next()', () => {
        const next = jest.fn()
        authenticate.default(mockRequest as customRequest,mockResponse as Response, next)
        expect(next).toBeCalledTimes(1);
    });

    test('verifyJWT should be valid', () => {
        expect(verifyJWT(validKey)).toEqual(verified);
    });

    test('verifyJWT should throw error', () => {
        expect(() => {verifyJWT(invalidKey)}).toThrow(new Error('Invalid Signature'));
    });

});
