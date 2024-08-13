import express, {query, request, response} from "express";
import Product from "../Schemas/productSchema";
import Reviews from "../Schemas/reviewSchema";

export const createProduct = async (request: express.Request, response: express.Response) => {
    try {
        const product = await Product.create(request.body);
        response.status(200).json({
            status: 'success',
            data: {
                product
            }
        })

    } catch (err) {
        response.status(200).json({
            status: 'fail',
            error: err
        })
    }
}



export const getAllProduct = async (request: express.Request, response: express.Response) => {
    try{
        let queryObj = {...request.query};
        const restrictedList: string[] = ['sort', 'page', 'limit', 'field'];
        restrictedList.forEach(el => delete queryObj[el])
        let queryStr = JSON.stringify(queryObj).replace(/\b(gte|gt|lt|lte)\b/g, match => `$${match}`)
        queryObj = JSON.parse(queryStr)

        let products =  Product.find(queryObj);

        if(request.query.sort){
            const sortBy:string = (request.query.sort as string).split(',').join(' ')
            products = products.sort(sortBy)
        }
        if(request.query.select){
            const selectedFields = (request.query.select as string).split(',').join(' ');
            products = products.select(selectedFields)
        }
        if(request.query.page){
            const page: number = (+request.query.page!) || 1;
            const limit: number = (+request.query.limit!) || 2;
            const skip = (page -1) * limit
            products = products.skip(skip).limit(limit)
        }


        const allProduct = await products



        response.status(200).json({
            status: 'success',

            data: {
                products: allProduct
            }
        })

    }catch (err){
        response.status(400).json({
            status: 'fail',
            error: err
        })
    }
}


export const getProductById = async (request: express.Request, response: express.Response) => {
    try{
        // console.log(request.params)
        const product = await Product.findById(request.params.id);
        response.status(200).json({
            status: 'success',
            data:{
                product
            }
        })
    }catch (err){
        response.status(400).json({
            status: 'fail',
            error: err
        })
    }
}




export const updateProduct = async (request: express.Request, response: express.Response) => {
    try{
        const product = await Product.findByIdAndUpdate(request.params.id, request.body, {new: true});
        response.status(200).json({
            status: 'success',
            data: {
                product
            }
        })

    }catch (err){
        response.status(400).json({
            status: 'fail',
            error: err
        })
    }
}

export const deleteProduct = async (request: express.Request, response: express.Response) => {
    try{
        const deletedProduct = await Product.findByIdAndDelete(request.params.id)
        response.status(200).json({
            status: 'success',
            data:{}
        })
    }catch (err){
        response.status(200).json({
            status: 'fail',
            error: err
        })
    }
}

export const postAReview = async (request: express.Request, response: express.Response) => {
    try{
        if(!request.body.review) throw new Error('This is for passing review');
        const review = await Reviews.create({
            review: request.body.review,
            createdAt: Date.now(),
            product: request.params.id,
        });
        const updatedProduct = await Product.findByIdAndUpdate(
            request.params.id,
            { $push: { reviews: review._id} }, // Use $push for atomic updates
            { new: true } // Return the updated product
        );

        response.status(200).json({
            status: 'success',
            data:{
                updatedProduct
            }
        })


    }catch (err) {
        response.status(200).json({
            status: 'fail',
            error: err,
        })
    }
}






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


