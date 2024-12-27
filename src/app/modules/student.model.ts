import { Schema, model } from 'mongoose';
import {
  Gurdian,
  LocalGurdian,
  Student,
  UserName,
} from './student/student.interface';
import validator from 'validator';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: [20, 'more than 20 characters is not allowed as first name.'],
    validate: {
      validator: function (value: string) {
        const firstNameStr =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        return firstNameStr === value;
      },
      message: '{VALUE} is not in a capitalize format',
    },
  },

  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    trim: true,
    required: true,
    /* validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    }, */
  },
});

const GurdianSchema = new Schema<Gurdian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const localGurdianSchema = new Schema<LocalGurdian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema({
  id: {
    type: String,
    required: [true, 'ID is required.'],
    unique: true,
  },
  name: {
    type: userNameSchema,
    required: [true, 'Name is required.'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: 'Gender must be one of male, female, or Other.',
    },
    required: [true, 'Gender is required.'],
  },
  dateOfBirth: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not valid',
    },
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact number is required.'],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message:
        'Blood group must be one of A+, A-, B+, B-, AB+, AB-, O+, or O-.',
    },
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required.'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is required.'],
  },
  gurdian: {
    type: GurdianSchema,
    required: [true, 'Gurdian is required.'],
  },
  localGurdian: {
    type: localGurdianSchema,
    required: [true, 'Local Gurdian is required.'],
  },
  profileImg: {
    type: String,
  },
  isActive: {
    type: String,
    enum: {
      values: ['active', 'blocked'],
      message: 'Status must be either active or blocked.',
    },
    default: 'active',
  },
});

// creating Student Model
export const StudentModel = model<Student>('Student', studentSchema);
