import {Router} from "express";
import * as reviewHandler from "../handler/reviewHandler";


const router = Router();

router.route('/').get(reviewHandler.getAllReviews)

router.route('/:id').get(reviewHandler.getAReviewById).patch(reviewHandler.updateReviewbyId).delete(reviewHandler.deleteReviewById)



export default router