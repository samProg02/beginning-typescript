"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProduct = exports.createProduct = void 0;
const productSchema_1 = __importDefault(require("../Schemas/productSchema"));
const createProduct = async (request, response) => {
    try {
        const product = await productSchema_1.default.create(request.body);
        response.status(200).json({
            status: 'success',
            data: {
                product
            }
        });
    }
    catch (err) {
        response.status(200).json({
            status: 'fail',
            error: err
        });
    }
};
exports.createProduct = createProduct;
const getAllProduct = async (request, response) => {
    try {
        let queryObj = { ...request.query };
        const restrictedList = ['sort', 'page', 'limit', 'field'];
        restrictedList.forEach(el => delete queryObj[el]);
        let queryStr = JSON.stringify(queryObj).replace(/\b(gte|gt|lt|lte)\b/g, match => `$${match}`);
        queryObj = JSON.parse(queryStr);
        let products = productSchema_1.default.find(queryObj);
        if (request.query.sort) {
            const sortBy = request.query.sort.split(',').join(' ');
            products = products.sort(sortBy);
        }
        if (request.query.page) {
            const page = (+request.query.page) || 1;
            const limit = (+request.query.limit) || 2;
            const skip = (page - 1) * limit;
            products = products.skip(skip).limit(limit);
        }
        const allProduct = await products;
        response.status(200).json({
            status: 'success',
            data: {
                products: allProduct
            }
        });
    }
    catch (err) {
        response.status(400).json({
            status: 'fail',
            error: err
        });
    }
};
exports.getAllProduct = getAllProduct;
