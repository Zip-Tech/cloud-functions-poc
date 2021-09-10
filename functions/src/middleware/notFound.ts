export const errorHandler = (
    err: { message: any; stack: any; }, 
    req: any, 
    res: { 
        statusCode: number; 
        status: (arg0: any) => void; 
        json: (arg0: { message: any; stack: any; }
) => void; }, next: any) => {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
  }