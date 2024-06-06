import { z } from 'zod';

// Define the UserName schema
const userNameValidationSchema = z.object({
  firstName: z.string()
    .max(20, { message: 'First Name cannot be more than 20 characters' })
    .refine((value) => {
      const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
      return firstNameStr === value;
    }, { message: 'First name must be capitalized' }),
  middleName: z.string().optional(),
  lastName: z.string()
    .min(1, { message: 'Last name is required' })
    .refine((value) => /^[A-Za-z]+$/.test(value), { message: 'Last name must contain only alphabetic characters' }),
});

// Define the Guardian schema
const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, { message: 'Father Name is required' }),
  fatherContactNo: z.string().min(1, { message: 'Father Contact Number is required' }),
  fatherOccupation: z.string().min(1, { message: 'Father Occupation is required' }),
  motherName: z.string().min(1, { message: 'Mother Name is required' }),
  motherOccupation: z.string().min(1, { message: 'Mother Occupation is required' }),
  motherContactNo: z.string().min(1, { message: 'Mother Contact Number is required' }),
});

// Define the LocalGuardian schema
const localGuardianValidationSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  occupation: z.string().min(1, { message: 'Occupation is required' }),
  contactNo: z.string().min(1, { message: 'Contact Number is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
});

// Define the Student schema
export const createStudentValidationSchema = z.object({
  body: z.object({
  password: z.string().nonempty({ message: 'ID is required' }).max(20),
  student: z.object({

  name: userNameValidationSchema,
  gender: z.enum(['male', 'female', 'other'], { message: 'Gender is required' }),
  dateOfBirth: z.string().optional(),
  email: z.string()
    .nonempty({ message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  contractNo: z.string().nonempty({ message: 'Contact Number is required' }),
  emergencyContactNo: z.string().nonempty({ message: 'Emergency Contact Number is required' }),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
  presentAddress: z.string().min(1, { message: 'Present Address is required' }),
  permanentAddress: z.string().nonempty({ message: 'Permanent Address is required' }),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  admissionSemester: z.string(),
  profileImg: z.string().optional(),
  academicDepartment: z.string()
  
  })
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloogGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      profileImg: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});



export const  studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
