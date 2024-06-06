import { Schema, model} from 'mongoose'
import { TAcademicDepartment } from './academicDepartment.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';


const academicDepartmentSchema = new Schema<TAcademicDepartment>({

    name: {
        type: String,
        required: true,
        unique: true,  
    }, 
    
    academicFaculty: {

        type: Schema.Types.ObjectId,
        ref: 'AcademicFaculty',
    }
},
{
    timestamps: true,
}
);

// Pre middleware for existing department
academicDepartmentSchema.pre('save', async function(next) {

    const isDepartmentExist = await AcademicDepartment.findOne({
        name: this.name,
    });
    if(isDepartmentExist){
        throw new AppError(httpStatus.NOT_FOUND,'Department is already exist')
    }
    next();
});



// Pre middleware for updating department

academicDepartmentSchema.pre('findOneAndUpdate', async function(next){

    const query = this.getQuery();
    const isDepartmentExist = await AcademicDepartment.findOne(query);
    if(!isDepartmentExist) {
        throw new AppError(httpStatus.NOT_FOUND,'This department does not exist !')
    }
    next();
});


export const AcademicDepartment = model<TAcademicDepartment>('AcademicDepartment', academicDepartmentSchema)