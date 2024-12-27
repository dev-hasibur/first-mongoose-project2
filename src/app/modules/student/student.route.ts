import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

// create a new student
router.post('/create-student', StudentControllers.createStudent);
// get all students
router.get('/', StudentControllers.getAllStudents);
// get Single student
router.get('/:studentId', StudentControllers.getSingleStudent);

export const StudentRoutes = router;
