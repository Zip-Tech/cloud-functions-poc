import { Request, Response } from "express";
import { errorHandler } from './errorHandler';

describe('errorHandler', () => {

    let mockRequest: Partial<Request>
    let mockResponseStatusCode500: Partial<Response>;
    let mockResponseStatusCode200: Partial<Response>;
    let responseObject: any;

    beforeEach(() => {
        mockRequest = {};
        mockResponseStatusCode500 = {
            statusCode: 500,
            send: jest.fn().mockImplementation(result => {
                responseObject = result;
            })
        }
        mockResponseStatusCode200 = {
            statusCode: 200,
            send: jest.fn().mockImplementation(result => {
                responseObject = result;
            })
        }
    })
    test('errorHandler shoud return error message', () => {
        const error = {
            message: 'Test Error',
            stack: 'Test Error Stack'
        }
        errorHandler(error, mockRequest as Request, mockResponseStatusCode500 as Response, () => {})
        expect(responseObject).toEqual(error)
    })
    test('error handler should return status code 500', () => {
        const error = {
            message: 'Test Error',
            stack: 'Test Error Stack'
        }
        errorHandler(error, mockRequest as Request, mockResponseStatusCode200 as Response, () => {})
        expect(mockResponseStatusCode200.statusCode).toBe(500)
    })
    test('stack should be null when in production', () => {
        process.env.NODE_ENV = 'production'
        const error = {
            message: 'Test Error',
            stack: 'Test Error Stack'
        }
        errorHandler(error, mockRequest as Request, mockResponseStatusCode500 as Response, () => {})
        expect(responseObject.stack).toEqual(null)
    })
})