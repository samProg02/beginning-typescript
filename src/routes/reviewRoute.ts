import {Router} from "express";
import * as reviewHandler from "../handler/reviewHandler";
import * as authHandler from './../handler/authHandler'


const router = Router();

router.route('/').get(authHandler.protect,authHandler.userAccess('seller', 'buyer'), reviewHandler.getAllReviews)

router.route('/:id').get(authHandler.protect, reviewHandler.getAReviewById).patch(authHandler.protect,authHandler.userAccess('buyer'),reviewHandler.updateReviewbyId).delete(authHandler.protect,authHandler.userAccess('buyer'),reviewHandler.deleteReviewById)



export default router