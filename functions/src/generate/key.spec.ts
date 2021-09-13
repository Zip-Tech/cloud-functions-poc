import { Request, Response } from "express";
import { getKey } from './key';
import { v5 } from 'uuid';


describe('key', () => {
    let mockRequest: Partial<Request>
    let mockResponse: Partial<Response>;
    let responseObject: any;

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            statusCode: 0,
            send: jest.fn().mockImplementation(result => {
                responseObject = result;
            })
        }
    })

    test('key', () => {
        const expectedStatusCode = 200;
        const expectedResponse = {
            keyV5: v5('hello', '1b671a64-40d5-491e-99b0-da01ff1f3341'),
        }
        getKey(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.statusCode).toBe(expectedStatusCode);
        expect(responseObject).toEqual(expectedResponse)
    })

});
