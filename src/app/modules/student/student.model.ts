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
import bcrypt from "bcrypt";
import config from '../../config';
import { boolean } from 'zod';

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
  id: { type: String, required: true, unique: true },
  password: { type: String, required: [true,'Password is required'],
    maxlength:[20,'Password can not be more than 20 characters']
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
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not a valid email',
    },
  },
  contractNo: { type: String, required: [true, 'Contact Number is required'] },
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
  profileImg: String,
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
  isDeleted:{
    type: Boolean,
    default: false,
  }
},
{
  toJSON: {
    virtuals: true
  },
},)

// Virtual
studentSchema.virtual('fullName').get(function(){
//  return this.name.firstName + this.name.middleName + this.name.lastName

return(
  `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
)
})

// pre save middleware/hook: will work on create() & save()

studentSchema.pre('save',async function(next){
  // console.log(this, 'pre hook: we will save the data');
  // HASHING PASSWORD AND SAVE IN DB
  const user = this; //doc
  user.password = await bcrypt.hashSync(user.password,Number(config.bcrypt_salt_rounds));

  next();
})

// post save middleware/hook
studentSchema.post('save', function(doc, next){
  doc.password =''
  console.log(this, 'post hook : we  saved the data');
  next()
})

// query middleware

studentSchema.pre('find', function( next){
 this.find({isDeleted: {$ne: true}}) 
// console.log(this);
next()
})

studentSchema.pre('findOne', function( next){
 this.find({isDeleted: {$ne: true}}) 
// console.log(this);
next()
})
studentSchema.pre('aggregate', function( next){

  this.pipeline().unshift({$match: {isDeleted: {$ne: true}}})
// console.log(this);
next()
})


// creating a custom static method

studentSchema.statics.isUserExists = async function(id: string){
  const existingUser = await Student.findOne({id});
  return existingUser;
}

// creating a custom instance method

// studentSchema.methods.isUserExists = async function(id: string) {
//   const existingUser = await Student.findOne({id})
//   return existingUser;
// }

export const Student = model<TStudent,StudentModel >('Student', studentSchema)
