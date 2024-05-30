import express from 'express';
import { AcademicSemesterControllers } from './academicSemesterController';


const router = express.Router();

router.post('/create-academic-semester',AcademicSemesterControllers.createAcademicSemester);



// will call controller function

// router.get('/', StudentControllers.getAllStudents)

// router.get('/:studentId', StudentControllers.getSingleStudent)

// router.delete('/:studentId', StudentControllers.deleteStudent)


export const AcademicSemesterRoutes = router;