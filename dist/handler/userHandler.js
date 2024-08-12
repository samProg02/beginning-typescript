"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUser = getAllUser;
exports.createUSer = createUSer;
function getAllUser(request, response) {
    response.status(200).json({
        "hi": "hello"
    });
}
function createUSer(request, response) {
    response.status(200).json({
        username: request.body.name,
        name: request.body.name,
        email: request.body.email
    });
}
