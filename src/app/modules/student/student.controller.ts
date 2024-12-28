import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import StudentValidationSchema from './student.zodValidation';
// import studentJoiValidationSchema from './student.joiValidation';

// create a new student
const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    // from this line  joi validation start
    // joi validation
    // const { error, value } = studentJoiValidationSchema.validate(studentData);
    // console.log(error);

    // will call service function to send this data
    // const result = await StudentServices.createStudentIntoDB(value);

    /*    if (error) {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: error.details,
      });
    } */
    // this line joi validation end

    // Zod validation start
    const jodParsedData = StudentValidationSchema.parse(studentData);
    // Zod validation end

    const result = await StudentServices.createStudentIntoDB(jodParsedData);

    // send response to user
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

// get all students
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    // send response to user
    res.status(200).json({
      success: true,
      message: 'Students are retrived successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

// get single student
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    // send response to user
    res.status(200).json({
      success: true,
      message: 'Single student retrieved successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
