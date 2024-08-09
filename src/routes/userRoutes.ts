import {Router} from "express";
import {createUSer, getAllUser} from "../handler/userHandler";

const router = Router()


router.route('/').get(getAllUser)
router.route('/create-user').post(createUSer)




export default router