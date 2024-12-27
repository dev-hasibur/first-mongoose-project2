import { StudentModel } from '../student.model';
import { Student } from './student.interface';

// create single student
const createStudentIntoDB = async (studentData: Student) => {
  // bulit-in static method
  // const result = await StudentModel.create(student);
  // built-in instance method
  const student = new StudentModel(studentData);
  const result = await student.save();
  return result;
};

// get all students
const getAllStudentFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};
// get single student
const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id: id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
};
