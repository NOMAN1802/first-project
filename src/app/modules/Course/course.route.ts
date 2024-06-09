import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidations } from './course.validation';
import { CourseControllers } from './course.controller';



const router = express.Router();

router.post('/create-course',
validateRequest(CourseValidations.createCourseValidationSchema),
CourseControllers.createCourse,
);

router.get(
    '/:id',
    CourseControllers.getSingleCourse,
  );
  
//   router.patch(
//     '/:facultyId',
//     validateRequest(
//       AcademicFacultyValidation.updateAcademicFacultyValidationSchema
//     ),
//     AcademicFacultyControllers.updateAcademicFaculty,
//   );

router.delete(
    '/:id',
    CourseControllers.deleteCourse,
  );
  
  router.get('/', CourseControllers.getAlLCourses);



export const CourseRoutes = router;