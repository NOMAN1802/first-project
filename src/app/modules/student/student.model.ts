import { Schema, model } from 'mongoose'
import validator from 'validator'
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  // StudentMethods,
  // StudentModel,
  TUserName,
} from './student.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'First Name can not be more than 20 character'],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1)
        return firstNameStr === value
      },
      message: '{VALUE} is not in capitalize formate',
    },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
})

const guardianScheme = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'fatherName Name is required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'fatherContactNo  is required'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'fatherOccupation  is required'],
  },
  motherName: {
    type: String,
    required: [true, 'motherName  is required'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'motherOccupation  is required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'motherContactNo  is required'],
  },
})

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  occupation: {
    type: String,
    required: [true, 'occupation is required'],
  },

  contactNo: {
    type: String,
    required: [true, 'contactNo is required'],
  },
  address: {
    type: String,
    required: [true, 'address is required'],
  },
})
// StudentMethods-- for instance
const studentSchema = new Schema<TStudent, StudentModel>({
  id: {
     type: String, required: [true,'Id is required'], 
     unique: true,   

   },

  user: {
     type: Schema.Types.ObjectId,
     required: [true,'User Id is required'],
     unique: true,
     ref: 'User'
  },
  
  name: {
    type: userNameSchema,
    required: [true, 'name is required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: ' {VALUE} is not valid',
    },
    required: [true, 'Gender is required'],
  },
  dateOfBirth: { type: Date },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not a valid email',
    },
  },
  contractNo: { 
    type: String,
    required: [true, 'Contract number is required']

   },
  emergencyContactNo: {
    type: String,
    required: [true, 'emergencyContactNo is required'],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: '{VALUE} is not supported',
    },
  },
  presentAddress: {
    type: String,
    required: [true, 'present address is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'permanent address is required'],
  },
  guardian: {
    type: guardianScheme,
    required: [true, 'guardian is required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local guardian is required'],
  },
  profileImg:{type: String},

  admissionSemester: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemester',
  },

  isDeleted:{
    type: Boolean,
    default: false,
  },
  academicDepartment : {
    type: Schema.Types.ObjectId,
    ref: 'AcademicDepartment',
    }

},
{
  toJSON: {
    virtuals: true
  },
},)
// Virtual
studentSchema.virtual('fullName').get(function(){
return(
  `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`
)
})
// query middleware
 studentSchema.pre('find', function( next){
 this.find({isDeleted: {$ne: true}}) 
 next();
});

studentSchema.pre('findOne', function( next){
 this.find({isDeleted: {$ne: true}}) 
next();
});
studentSchema.pre('aggregate', function( next){
  this.pipeline().unshift({$match: {isDeleted: {$ne: true}}})
  next();
});
// creating a custom static method
studentSchema.statics.isUserExists = async function(id: string){
  const existingUser = await Student.findOne({id});
  return existingUser;
};

export const Student = model<TStudent,StudentModel >('Student', studentSchema)
