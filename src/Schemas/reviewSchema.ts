import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: true,

    },
    createdAt: {
        type: Date
    },
    product: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Product',

    }],
    user:{
      type: String,
    },
    likes: {
        type: Number,
        default: 0
    }

})

//
// reviewSchema.pre('find', function(this: mongoose.Document,next){
//     this.populate('product')
//     next()
// })

const Reviews = mongoose.model('Reviews', reviewSchema);



export default Reviews