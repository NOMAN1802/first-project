
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { courseServices } from "./course.service";




const createCourse = catchAsync(async (req, res) => {
    
  //will call service func to send this data
  const result = await courseServices.createCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is created successfully',
    data: result,
  })
});

const getAlLCourses = catchAsync(async (req, res) => {
  const result = await courseServices.getAlLCoursesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Courses are retrieved successfully',
    data: result,
  });
});


const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await courseServices.getSingleCourseFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is retrieved successfully',
    data: result,
  });
});

// const updateAcademicFaculty = catchAsync(async (req, res) => {
//   const { facultyId} = req.params;
//   const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
//     facultyId,
//     req.body,
//   );

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Academic faculty is updated successfully',
//     data: result,
//   });
// });

const deleteCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result =
      await courseServices.deleteCourseFromDB(id)
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course is deleted successfully',
      data: result,
    });
  });
  export const CourseControllers = {
    createCourse,
    getAlLCourses,
    getSingleCourse,
    deleteCourse ,
  }; 