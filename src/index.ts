import express, {json} from 'express'
import userRouter from './routes/userRoutes'
import productRoute from "./routes/productRoute";

const app = express()

app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/product', productRoute);








export default app