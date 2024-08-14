"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reviewSchema = new mongoose_1.default.Schema({
    review: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date
    },
    product: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    user: {
        type: String,
    },
    likes: {
        type: Number,
        default: 0
    }
});
const Reviews = mongoose_1.default.model('Reviews', reviewSchema);
exports.default = Reviews;
