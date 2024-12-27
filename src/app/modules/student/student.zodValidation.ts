import { z } from 'zod';

const UserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required.')
    .max(20, 'More than 20 characters is not allowed as first name.')
    .refine(
      (value) =>
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() === value,
      { message: 'First name must be capitalized.' },
    ),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required.'),
});

const GurdianValidationSchema = z.object({
  fatherName: z.string().min(1, "Father's name is required."),
  fatherOccupation: z.string().min(1, "Father's occupation is required."),
  fatherContactNo: z.string().min(1, "Father's contact number is required."),
  motherName: z.string().min(1, "Mother's name is required."),
  motherOccupation: z.string().min(1, "Mother's occupation is required."),
  motherContactNo: z.string().min(1, "Mother's contact number is required."),
});

const LocalGurdianValidationSchema = z.object({
  name: z.string().min(1, "Local guardian's name is required."),
  occupation: z.string().min(1, "Local guardian's occupation is required."),
  contactNo: z.string().min(1, "Local guardian's contact number is required."),
  address: z.string().min(1, "Local guardian's address is required."),
});

const StudentValidationSchema = z.object({
  id: z.string().min(1, 'ID is required.'),
  name: UserNameValidationSchema,
  gender: z.enum(['male', 'female', 'other'], {
    errorMap: () => ({
      message: 'Gender must be one of male, female, or Other.',
    }),
  }),
  dateOfBirth: z.string().optional(),
  email: z
    .string()
    .email('Invalid email address.')
    .min(1, 'Email is required.'),
  contactNumber: z.string().min(1, 'Contact number is required.'),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
    errorMap: () => ({
      message:
        'Blood group must be one of A+, A-, B+, B-, AB+, AB-, O+, or O-.',
    }),
  }),
  presentAddress: z.string().min(1, 'Present address is required.'),
  permanentAddress: z.string().min(1, 'Permanent address is required.'),
  gurdian: GurdianValidationSchema,
  localGurdian: LocalGurdianValidationSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
});

export default StudentValidationSchema;
