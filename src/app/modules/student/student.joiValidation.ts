import Joi from 'joi';

// Joi schema for Student
const userNameJoiValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .required()
    .regex(/^[A-Z][a-z]*$/)
    .messages({
      'string.empty': 'First name is required.',
      'string.max': 'More than 20 characters is not allowed as first name.',
      'string.pattern.base': '{#value} is not in a capitalize format.',
    }),
  middleName: Joi.string().trim().allow(null, ''),
  lastName: Joi.string()
    .trim()
    .required()
    .regex(/^[a-zA-Z]+$/)
    .messages({
      'string.empty': 'Last name is required.',
      'string.pattern.base': '{#value} is not valid.',
    }),
});

// Joi schema for Gurdian
const gurdianJoiValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'string.empty': 'Father name is required.',
  }),
  fatherOccupation: Joi.string().required().messages({
    'string.empty': 'Father occupation is required.',
  }),
  fatherContactNo: Joi.string().required().messages({
    'string.empty': 'Father contact number is required.',
  }),
  motherName: Joi.string().required().messages({
    'string.empty': 'Mother name is required.',
  }),
  motherOccupation: Joi.string().required().messages({
    'string.empty': 'Mother occupation is required.',
  }),
  motherContactNo: Joi.string().required().messages({
    'string.empty': 'Mother contact number is required.',
  }),
});

// Joi schema for Local Gurdian
const localGurdianJoiValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Local guardian name is required.',
  }),
  occupation: Joi.string().required().messages({
    'string.empty': 'Local guardian occupation is required.',
  }),
  contactNo: Joi.string().required().messages({
    'string.empty': 'Local guardian contact number is required.',
  }),
  address: Joi.string().required().messages({
    'string.empty': 'Local guardian address is required.',
  }),
});

// Joi schema for Student
const studentJoiValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.empty': 'ID is required.',
  }),
  name: userNameJoiValidationSchema.required().messages({
    'object.base': 'Name is required.',
  }),
  gender: Joi.string().valid('male', 'female', 'Other').required().messages({
    'any.only': 'Gender must be one of male, female, or Other.',
    'string.empty': 'Gender is required.',
  }),
  dateOfBirth: Joi.string().isoDate().allow(null, '').messages({
    'date.format': 'Date of birth must be a valid ISO date.',
  }),
  email: Joi.string().email().required().messages({
    'string.email': '{#value} is not valid.',
    'string.empty': 'Email is required.',
  }),
  contactNumber: Joi.string().required().messages({
    'string.empty': 'Contact number is required.',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .allow(null, '')
    .messages({
      'any.only':
        'Blood group must be one of A+, A-, B+, B-, AB+, AB-, O+, or O-.',
    }),
  presentAddress: Joi.string().required().messages({
    'string.empty': 'Present address is required.',
  }),
  permanentAddress: Joi.string().required().messages({
    'string.empty': 'Permanent address is required.',
  }),
  gurdian: gurdianJoiValidationSchema.required().messages({
    'object.base': 'Guardian information is required.',
  }),
  localGurdian: localGurdianJoiValidationSchema.required().messages({
    'object.base': 'Local guardian information is required.',
  }),
  profileImg: Joi.string().uri().allow(null, '').messages({
    'string.uri': 'Profile image must be a valid URI.',
  }),
  isActive: Joi.string().valid('active', 'blocked').default('active').messages({
    'any.only': 'Status must be either active or blocked.',
  }),
});
// Joi validation schema end

export default studentJoiValidationSchema;
