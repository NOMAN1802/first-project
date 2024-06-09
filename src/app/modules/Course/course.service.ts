import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { CourseSearchableFields } from "./course.constant";
import { TCourse } from "./course.interface";
import { Course } from "./course.model"
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createCourseIntoDB = async(payload: TCourse)=>{

    const result = await Course.create(payload);
    return result;
};

const getAllCoursesFromDB = async(query: Record<string, unknown>)=>{

    const courseQuery = new QueryBuilder(Course.find()
    .populate('preRequisiteCourses.course')
    ,query)
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
    const result  = await courseQuery.modelQuery;
    return result;
};


const getSingleCourseFromDB = async(id: string)=>{
    const result  = await Course.findById(id)
    .populate('preRequisiteCourses.course');
    return result;
};

const updateCourseIntoDB = async(id: string, payload: Partial<TCourse>)=>{

const {preRequisiteCourses,...courseRemainingData} = payload;

const session= await mongoose.startSession()

try{
session.startTransaction()

// step 1 --> basic course info update

const updateBasicCourseInfo = await Course.findByIdAndUpdate(
    id,
    courseRemainingData,
    {
        new: true,
        runValidators: true,
        session
    },
);

if(!updateBasicCourseInfo){
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course') 
};

// Check if there is any prerequisite courses to update
if(preRequisiteCourses && preRequisiteCourses.length > 0 ){
    // filer out the deleted field
const deletedPreRequisites = preRequisiteCourses.filter(el => el.course && el.isDeleted).map(el => el.course)

const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(id,
    {
        $pull: {preRequisiteCourses: {course: 
            {$in: deletedPreRequisites}
        }},
    },{
        new: true,
        runValidators: true,
        session
    });
    if(!deletedPreRequisiteCourses){
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course') 
    };

     // filer out the new course field

 const newPreRequisites = preRequisiteCourses?.filter(el => el.course && !el.isDeleted);

 const newPreRequisiteCourses = await Course.findByIdAndUpdate(
    id,
    {
        $addToSet: {preRequisiteCourses: {$each: newPreRequisites }},
    },{
        new: true,
        runValidators: true,
        session
    }
 );
 if(!newPreRequisiteCourses){
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course') 
};


const result = await Course.findById(id).populate('preRequisiteCourses.course')
return result

};

await session.commitTransaction();
await session.endSession();
}catch(err){

    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course') 
}


};

const deleteCourseFromDB = async(id: string)=>{
    const result  = await Course.findByIdAndUpdate(
        id,
        {isDeleted: true},
        {
            new: true,
        },
    
    );
    return result;
};

const assignFacultiesIntoDB = asyn(id: string, payload: )

export const courseServices = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getSingleCourseFromDB,
    updateCourseIntoDB,
    deleteCourseFromDB,
}