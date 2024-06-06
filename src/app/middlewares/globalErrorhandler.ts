/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import  {  ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../interface/error';
import config from '../config';
import handleZodError from '../errors/handelZodError';
import handleValidationError from '../errors/handleValidationError';

const globalErrorHandler:ErrorRequestHandler =(err,req, res,next) => {

  // setting default values
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Some thing went wrong';   

    let errorSources : TErrorSources = [{
       path: '',
       message: 'Some thing went wrong',
    },
  ];

    if(err instanceof ZodError){
      
      const simplifiedError = handleZodError(err)
      statusCode = simplifiedError?.statusCode;
      message = simplifiedError?.message;
      errorSources = simplifiedError?.errorSources;
    }else if(err?.name === 'ValidationError'){
      
      const simplifiedError = handleValidationError(err)
      statusCode = simplifiedError.statusCode;
      message = simplifiedError.message;
      errorSources = simplifiedError.errorSources;
    }

    //ultimate return

    return res.status(statusCode).json({
      success: false,
      message,
      errorSources,
      // err,
      stack: config.NODE_ENV === 'development' ? err?.stack : null,
      
    })
  };

  export default globalErrorHandler;

  /*   
   success
   message
   errorSources:[
   path:'',
   message: ''

   ]
   stack
  */