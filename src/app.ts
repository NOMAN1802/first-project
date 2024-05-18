import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { StudentRoute } from './app/modules/student/student.route'
const app: Application = express()

// parsers
app.use(express.json())
app.use(cors())

// application route

app.use('/api/v1/students', StudentRoute)

const getAController = (req: Request, res: Response) => {
  const a = 10
  res.send(a)
}

app.get('/', getAController)

export default app
