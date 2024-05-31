
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { AcademicSemesterServices } from "./AcademicSemester.service";
import catchAsync from "../../utils/catchAsync";



const createAcademicSemester = catchAsync(async (req, res) => {
    
  //will call service func to send this data
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester is created successfully',
    data: result,
  })
});

  export const AcademicSemesterControllers = {
    createAcademicSemester,
  };