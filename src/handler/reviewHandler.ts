import express, {NextFunction, Request, request} from "express";
import Reviews from "../Schemas/reviewSchema";
interface CustomRequest extends Request {
    user?: any; // Replace 'any' with the actual type of your user object
}
export const getAllReviews = async (request: express.Request, response: express.Response) => {
    try{
        const allReviews = await Reviews.find().populate('product' , 'name -reviews');
        response.status(200).json({
            status: 'success',
            data: {
                reviews: allReviews
            }
        })
    }catch (err) {
        response.status(400).json({
            status: 'fail',
            error: (err as Error).message
        })
    }
}



export const getAReviewById = async (request: express.Request, response: express.Response) => {
    try{
        const review = await Reviews.findById(request.params.id);
        response.status(200).json({
            status: 'success',
            data: {
                review
            }
        })
    }catch(err){
        response.status(400).json({
            status: 'fail',
            error: (err as Error).message
        })
    }
}



export const updateReviewbyId = async (request: CustomRequest, response: express.Response) => {
    try{
        let reviewToUpdate = await Reviews.findById(request.params.id )
        // console.log((request.user._id as string).toString(),reviewToUpdate!.user, `new ObjectId(${reviewToUpdate!.user})`)
        if(!((request.user._id as string).toString() === (reviewToUpdate!.user as string ))) throw new Error('You\'re not the creator of the review');

        const updatedReview = await Reviews.findByIdAndUpdate(request.params.id, {review: request.body.review}, {new: true} );


        response.status(200).json({
            status: 'success',
            data: {
                review: updatedReview
            }
        })
    }catch(err){
        response.status(400).json({
            status: 'fail',
            error: (err as Error).message
        })
    }
}


export const deleteReviewById = async (request: CustomRequest, response: express.Response) => {
    try{
        const reviewToDelete = await Reviews.findById(request.params.id);
        if(!((request.user._id as string).toString() === (reviewToDelete!.user as string ))) throw new Error('You\'re not the creator of the review');

        const deletedReview = await Reviews.findByIdAndDelete(request.params.id);
        response.status(200).json({
            status: 'success',
            data: {}
        })
    }catch (err){
        response.status(400).json({
            status: 'fail',
            error: (err as Error).message
        })
    }
}

