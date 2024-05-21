import { Request, Response } from 'express'
import { StudentServices } from './student.service'
// import studentValidationSchema from './student.validation';

import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {

    //creating a schema validation using zod
   
    const { student: studentData } = req.body;

  //  Data validation using joi 
  //  const { error, value} =  studentValidationSchema.validate(studentData);

  //  Data validation using zod

  const zodParseData =  studentValidationSchema.parse(studentData)

    //will call service func to send this data
    const result = await StudentServices.createStudentIntoDB(zodParseData)

  //  console.log({value}, {error});

  //  if(error){
  //   res.status(500).json({
  //     success: false,
  //     message: 'Something went wrong',
  //     error: error.details ,
  // })

  //  }
   
    // send response
    res.status(200).json({
      success: true,
      message: 'student is created successfully',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message:err.message || 'Something went wrong',
      error: err,
  })
}
}

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB()
    // send response
    res.status(200).json({
      success: true,
      message: 'Student are retrieved successfully',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message:err.message || 'Something went wrong',
      error: err,
  })
  }
}

const getSingleStudent = async (req: Request, res: Response) => {
  try{
    const { studentId } = req.params
  const result = await StudentServices.getSingleStudentFromDB(studentId)

  res.status(200).json({
    success: true,
    message: 'Student is retrieved successfully',
    data: result,
  })
  }catch(err: any){
   
    res.status(500).json({
      success: false,
      message:err.message || 'Something went wrong',
      error: err,
  })
  }
}



const deleteStudent = async (req: Request, res: Response) => {
  try{
    const { studentId } = req.params
  const result = await StudentServices.deleteStudentFromDB(studentId)

  res.status(200).json({
    success: true,
    message: 'Student is DELETED successfully',
    data: result,
  })
  }catch(err: any){
   
    res.status(500).json({
      success: false,
      message:err.message || 'Something went wrong',
      error: err,
  })
  }
}
export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent
}

