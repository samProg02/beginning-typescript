import express, {json} from 'express'
import userRouter from './routes/userRoutes'

const app = express()

app.use(express.json())

app.use('/api/users', userRouter)

app.get('/login', (req: express.Request, res: express.Response, Next: express.NextFunction) => {
    req.params
})


app.listen(8000, () => {
    console.log('app running on port 8000')
})