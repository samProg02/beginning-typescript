"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'A product must have a name'],
        minLength: 6,
        maxLength: 20
    },
    price: {
        type: Number,
        required: [true, 'A product must have a particular price']
    },
    discount: {
        type: Number,
    },
    coverImage: String,
    previewImages: {
        type: [String],
        // required: [true, 'You have to provide an array of images for range of the product']
    },
    category: {
        type: [String],
        required: [true, 'Provide category to help sell your goods fast']
    },
    description: {
        type: String,
        required: [true, 'Provide a brief description of your goods']
    },
    available: {
        type: Boolean,
        default: true
    },
    updatedAt: {
        type: Date
    },
    reviews: {
        type: String
    }
});
const Product = mongoose_1.default.model('Product', productSchema);
exports.default = Product;
