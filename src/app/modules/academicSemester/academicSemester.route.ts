import express from 'express';
import { AcademicSemesterControllers } from './academicSemesterController';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidations } from './AcademicSemester.validation';


const router = express.Router();

router.post('/create-academic-semester',
validateRequest(AcademicSemesterValidations.createAcademicSemesterValidationSchema),
AcademicSemesterControllers.createAcademicSemester);

router.get(
    '/:semesterId',
    AcademicSemesterControllers.getSingleAcademicSemester,
  );
  
  router.patch(
    '/:semesterId',
    validateRequest(
      AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
    ),
    AcademicSemesterControllers.updateAcademicSemester,
  );
  
  router.get('/', AcademicSemesterControllers.getAllAcademicSemesters);



export const AcademicSemesterRoutes = router;