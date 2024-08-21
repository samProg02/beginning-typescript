import {Router} from "express";
import * as productHandler from './../handler/productHandlers'
import * as authHandler from './../handler/authHandler'
import productSchema from "../Schemas/productSchema";

const router = Router();



router.route('/').post(authHandler.protect,authHandler.userAccess('seller'),productHandler.createProduct).get(productHandler.getAllProduct)
// router.route('/:slug').get(productHandler.getProductById);
router.route('/:id').get(productHandler.getProductById).patch(authHandler.protect,authHandler.userAccess('seller'),productHandler.updateProduct).delete(authHandler.protect,authHandler.userAccess('seller', 'admin'),productHandler.deleteProduct).post(authHandler.protect,authHandler.userAccess('buyer','seller'),productHandler.postAReview)








export default router