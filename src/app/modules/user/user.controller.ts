import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { RequestHandler } from "express";



const createStudent : RequestHandler = async (req, res,next) => {
    try {
  
      //creating a schema validation using zod
     
      const { password,   student: studentData } = req.body;
  
    //  Data validation using joi 
    //  const { error, value} =  studentValidationSchema.validate(studentData);
  
    //  Data validation using zod
  
    // const zodParseData =  studentValidationSchema.parse(studentData)
  
      //will call service func to send this data
      const result = await UserServices.createStudentIntoDB(
        password, 
        studentData
    );
   
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student created successfully',
        data: result,
      })
    } catch (err) {
      next(err)
  }
  };

  export const UserControllers = {
    createStudent,
  }