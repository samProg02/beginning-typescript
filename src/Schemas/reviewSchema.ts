import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: true,

    },
    createdAt: {
        type: Date
    },
    product: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    user:{
      type: String,
    },
    likes: {
        type: Number,
        default: 0
    }

})


const Reviews = mongoose.model('Reviews', reviewSchema);


export default Reviews