import { Router } from 'express';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { StudentRoute } from '../modules/student/student.route';
import { UserRoute } from '../modules/user/user.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoute,
  },
  {
    path: '/students',
    route: StudentRoute,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;