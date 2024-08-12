import {Router} from "express";
import * as productHandler from './../handler/productHandlers'

const router = Router();



router.route('/').post(productHandler.createProduct).get(productHandler.getAllProduct)








export default router