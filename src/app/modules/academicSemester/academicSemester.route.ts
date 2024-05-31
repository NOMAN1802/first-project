import express from 'express';
import { AcademicSemesterControllers } from './academicSemesterController';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidations } from './AcademicSemester.validation';


const router = express.Router();

router.post('/create-academic-semester',
validateRequest(AcademicSemesterValidations.createAcademicSemesterValidationSchema),
AcademicSemesterControllers.createAcademicSemester);



export const AcademicSemesterRoutes = router;