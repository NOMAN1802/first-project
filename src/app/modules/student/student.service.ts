import { TStudent } from './student.interface'
import { Student } from './student.model'

const createStudentIntoDB = async (studentData: TStudent) => {

  // custom static

  if (await Student.isUserExists(studentData.id)){
    throw new Error('user already exist')
   }
  //built-in static method
  const result = await Student.create(studentData);



  //built-in instance method
  // const student = new Student(studentData)
  // create an instance
  // if(await student.isUserExists(studentData.id)){
  //   throw new Error('user already exist')
  // }
  
  // const result = await student.save()
  return result
}

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
  return result
}
const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id })
  const result = await Student.aggregate([
    {$match: {id: id}}
  ])
  return result
}
const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id },{isDeleted: true})
  return result
}
export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB
}
