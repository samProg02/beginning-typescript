import express, {request} from "express";
import Reviews from "../Schemas/reviewSchema";

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
            error: err
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
            error: err
        })
    }
}



export const updateReviewbyId = async (request: express.Request, response: express.Response) => {
    try{
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
            error: err
        })
    }
}


export const deleteReviewById = async (request: express.Request, response: express.Response) => {
    try{
        const deletedReview = await Reviews.findByIdAndDelete(request.params.id);
        response.status(200).json({
            status: 'success',
            data: {}
        })
    }catch (err){
        response.status(400).json({
            status: 'fail',
            error: err
        })
    }
}