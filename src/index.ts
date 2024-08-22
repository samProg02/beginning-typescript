import express, {json, NextFunction, request} from 'express'
import userRouter from './routes/userRoutes'
import productRoute from "./routes/productRoute";
import ReviewRoute from "./routes/reviewRoute";
import reviewRoute from "./routes/reviewRoute";
import cookieParser from 'cookie-parser'


const app = express()

app.use(express.json())
interface CustomError extends Error {
    statusCode: number;
    additionalData?: any;
}

// function createErrorHandler() {
//     return (err: CustomError, req: express.Request, res: express.Response, next: express.NextFunction) => {
//         // Log the error for debugging
//
//
//         // Handle specific error types or conditions
//         if (err.statusCode === 404) {
//             res.status(404).json({
//                 status: 'fail',
//                 message: 'Not Found',
//                 error: err,
//             });
//         } else if (err.statusCode === 500) {
//             res.status(500).json({
//                 status: 'fail',
//                 message: 'Internal Server Error',
//                 error: err,
//             });
//         } else {
//             res.status(err.statusCode || 500).json({
//                 status: 'fail',
//                 message: 'Error',
//                 error: err,
//             });
//         }
//     };
// }
app.use(cookieParser());
app.use('/api/users', userRouter);
app.use('/api/product', productRoute);
app.use('/api/reviews', reviewRoute);




app.use(( err: Error,request: express.Request, response: express.Response , next: NextFunction) => {
    response.status(400).json({
        status: 'fail',
        error: err
    })
    next()
})
// app.use(createErrorHandler())

export default app