import {Router} from "express";
// import {createUSer, getAllUser} from "../handler/userHandler";
import * as authHandler from './../handler/authHandler'
import * as userHandler from './../handler/userHandler'

const router = Router()


// router.route('/').get(getAllUser)
router.route('/sign-up').post(authHandler.signup)
router.route('/login').post(authHandler.login)
router.route('/forgot-password').post(authHandler.forgotPassword)
router.patch('/reset-password/:token', authHandler.resetPassword);
router.get('/logout', authHandler.logout)
router.patch('/update-password',authHandler.protect, authHandler.updatePassword)
router.patch('/deleteme', userHandler.deleteMe)

// router.post('/')




export default router