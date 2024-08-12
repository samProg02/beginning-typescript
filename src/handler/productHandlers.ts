import express, {query, request, response} from "express";
import Product from "../Schemas/productSchema";

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