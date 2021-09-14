import { Request, Response } from "express";

export const errorHandler = (
    err: { message: any; stack: any; }, 
    req: Request, 
    res: Response, next: any) => {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.statusCode = statusCode;
    res.send({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
  }