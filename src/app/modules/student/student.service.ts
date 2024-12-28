import { Student } from '../student.model';
import { TStudent } from './student.interface';

// create single student
const createStudentIntoDB = async (studentData: TStudent) => {
  // bulit-in static method
  // const result = await StudentModel.create(student);
  // built-in instance method
  const student = new Student(studentData);
  if (await student.isUserExists(studentData.id)) {
    throw new Error('User already exists!');
  }
  const result = await student.save();
  return result;
};

// get all students
const getAllStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};
// get single student
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id: id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
};
