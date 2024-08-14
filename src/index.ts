import express, {json} from 'express'
import userRouter from './routes/userRoutes'
import productRoute from "./routes/productRoute";
import ReviewRoute from "./routes/reviewRoute";
import reviewRoute from "./routes/reviewRoute";


const app = express()

app.use(express.json())

app.use('/api/users', userRouter);
app.use('/api/product', productRoute);
app.use('/api/reviews', reviewRoute);







export default app