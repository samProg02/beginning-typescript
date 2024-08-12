"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userHandler_1 = require("../handler/userHandler");
const router = (0, express_1.Router)();
router.route('/').get(userHandler_1.getAllUser);
router.route('/create-user').post(userHandler_1.createUSer);
exports.default = router;
