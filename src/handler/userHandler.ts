import express, {NextFunction, Request, request} from "express";
import {CreateUserRequest} from "../dtos/createUserRequesttype";
import Users from "./../Schemas/userSchema";
// import {User} from "../dtos/createUserResponseType"

interface CustomRequest extends Request {
    user?: any; // Replace 'any' with the actual type of your user object
}

export const deleteMe = async (request: CustomRequest, response: express.Response) => {
    await Users.findByIdAndUpdate(request.user._id, {active : false});


    response.status(204).json({
        status: 'Success',
        data:null
    })

}