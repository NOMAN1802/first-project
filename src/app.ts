
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { StudentRoute } from './app/modules/student/student.route'
import { UserRoute } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express()

// parsers
app.use(express.json())
app.use(cors())

// application route

app.use('/api/v1',router)

const test = (req: Request, res: Response) => {
  const a = 10
  res.send(a)
};


app.get('/', test);

app.use(globalErrorHandler);

// not found

app.use(notFound)
export default app
