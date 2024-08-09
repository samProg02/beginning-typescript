import express from "express";
import {CreateUserRequest} from "../dtos/createUserRequesttype";
import {User} from "../dtos/createUserResponseType"

export function getAllUser(request: express.Request, response: express.Response){
    response.status(200).json({
        "hi": "hello"
    })

}

export function createUSer  (request: express.Request<{}, {}, CreateUserRequest >, response: express.Response<User>){
    response.status(200).json({
        username: request.body.name,
        name: request.body.name, 
        email: request.body.email
    })
}