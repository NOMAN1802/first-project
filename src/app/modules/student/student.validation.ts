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
const studentValidationSchema = z.object({
  id: z.string().nonempty({ message: 'ID is required' }),
  password: z.string().nonempty({ message: 'ID is required' }).max(20),
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
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted:z.boolean(),
});

export default studentValidationSchema;
