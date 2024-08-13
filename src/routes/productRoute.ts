import {Router} from "express";
import * as productHandler from './../handler/productHandlers'
import productSchema from "../Schemas/productSchema";

const router = Router();



router.route('/').post(productHandler.createProduct).get(productHandler.getAllProduct)
// router.route('/:slug').get(productHandler.getProductById);
router.route('/:id').get(productHandler.getProductById).patch(productHandler.updateProduct).delete(productHandler.deleteProduct).post(productHandler.postAReview)








export default router