import {Router} from "express";
// import {createUSer, getAllUser} from "../handler/userHandler";
import * as authHandler from './../handler/authHandler'

const router = Router()


// router.route('/').get(getAllUser)
router.route('/sign-up').post(authHandler.signup)
router.route('/login').post(authHandler.login)
router.route('/forgot-password').post(authHandler.forgotPassword)
router.patch('/reset-password/:token', authHandler.resetPassword);
router.patch('/update-password',authHandler.protect, authHandler.updatePassword)

// router.post('/')




export default router