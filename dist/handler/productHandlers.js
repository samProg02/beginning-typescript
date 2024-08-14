"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postAReview = exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getAllProduct = exports.createProduct = void 0;
const productSchema_1 = __importDefault(require("../Schemas/productSchema"));
const reviewSchema_1 = __importDefault(require("../Schemas/reviewSchema"));
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
        if (request.query.select) {
            const selectedFields = request.query.select.split(',').join(' ');
            products = products.select(selectedFields);
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
const getProductById = async (request, response) => {
    try {
        // console.log(request.params)
        const product = await productSchema_1.default.findById(request.params.id);
        response.status(200).json({
            status: 'success',
            data: {
                product
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
exports.getProductById = getProductById;
const updateProduct = async (request, response) => {
    try {
        const product = await productSchema_1.default.findByIdAndUpdate(request.params.id, request.body, { new: true });
        response.status(200).json({
            status: 'success',
            data: {
                product
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
exports.updateProduct = updateProduct;
const deleteProduct = async (request, response) => {
    try {
        const deletedProduct = await productSchema_1.default.findByIdAndDelete(request.params.id);
        response.status(200).json({
            status: 'success',
            data: {}
        });
    }
    catch (err) {
        response.status(200).json({
            status: 'fail',
            error: err
        });
    }
};
exports.deleteProduct = deleteProduct;
const postAReview = async (request, response) => {
    try {
        if (!request.body.review)
            throw new Error('This is for passing review');
        const review = await reviewSchema_1.default.create({
            review: request.body.review,
            createdAt: Date.now(),
            product: request.params.id,
        });
        const updatedProduct = await productSchema_1.default.findByIdAndUpdate(request.params.id, { $push: { reviews: review._id } }, // Use $push for atomic updates
        { new: true } // Return the updated product
        );
        response.status(200).json({
            status: 'success',
            data: {
                updatedProduct
            }
        });
    }
    catch (err) {
        response.status(200).json({
            status: 'fail',
            error: err,
        });
    }
};
exports.postAReview = postAReview;
////////Get by slug
// export const getProductBySlug = async (request: express.Request, response: express.Response) => {
//     try{
//         const product = await Product.findOne({slug: request.params.slug});
//         response.status(200).json({
//             status: 'success',
//             data:{
//                 product
//             }
//         });
//
//     }catch (err){
//         response.status(400).json({
//             status: 'fail',
//             error: err
//         })
//     }
//
// }
