import Joi from 'Joi'
import validator from 'validator'

// creating a schema for validation using joi
// UserName schema
const userNameValidationSchema = Joi.object({
  firstName: Joi.string().trim().max(20).required().messages({
    'string.base': 'First Name must be a string',
    'string.empty': 'First Name is required',
    'string.max': 'First Name can not be more than 20 characters',
  }),
  middleName: Joi.string().optional(),
  lastName: Joi.string()
    .required()
    .pattern(/^[A-Za-z]+$/, '{VALUE} is not valid')
    .messages({
      'string.base': 'Last Name must be a string',
      'string.empty': 'Last Name is required',
      'string.pattern.base': '{VALUE} is not valid',
    }),
})

// Guardian schema
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'string.empty': 'Father Name is required',
  }),
  fatherContactNo: Joi.string().required().messages({
    'string.empty': 'Father Contact Number is required',
  }),
  fatherOccupation: Joi.string().required().messages({
    'string.empty': 'Father Occupation is required',
  }),
  motherName: Joi.string().required().messages({
    'string.empty': 'Mother Name is required',
  }),
  motherOccupation: Joi.string().required().messages({
    'string.empty': 'Mother Occupation is required',
  }),
  motherContactNo: Joi.string().required().messages({
    'string.empty': 'Mother Contact Number is required',
  }),
})

// LocalGuardian schema
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Local Guardian Name is required',
  }),
  occupation: Joi.string().required().messages({
    'string.empty': 'Occupation is required',
  }),
  contactNo: Joi.string().required().messages({
    'string.empty': 'Contact Number is required',
  }),
  address: Joi.string().required().messages({
    'string.empty': 'Address is required',
  }),
})

// Student schema
const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.empty': 'ID is required',
  }),
  name: userNameValidationSchema.required().messages({
    'any.required': 'Name is required',
  }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.only': '{VALUE} is not valid',
    'any.required': 'Gender is required',
  }),
  dateOfBirth: Joi.string().optional(),
  email: Joi.string().email().required().messages({
    'string.email': '{VALUE} is not a valid email',
    'string.empty': 'Email is required',
  }),
  contractNo: Joi.string().required().messages({
    'string.empty': 'Contact Number is required',
  }),
  emergencyContactNo: Joi.string().required().messages({
    'string.empty': 'Emergency Contact Number is required',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .messages({
      'any.only': '{VALUE} is not supported',
    }),
  presentAddress: Joi.string().required().messages({
    'string.empty': 'Present Address is required',
  }),
  permanentAddress: Joi.string().required().messages({
    'string.empty': 'Permanent Address is required',
  }),
  guardian: guardianValidationSchema.required().messages({
    'any.required': 'Guardian is required',
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    'any.required': 'Local Guardian is required',
  }),
  profileImg: Joi.string().optional(),
  isActive: Joi.string().valid('active', 'blocked').default('active').messages({
    'any.only': '{VALUE} is not valid',
  }),
})

export default studentValidationSchema
