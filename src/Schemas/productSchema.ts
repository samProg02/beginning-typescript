import mongoose from "mongoose";
import slugify from "slugify";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'A product must have a name'],
        minLength: 6,
        maxLength: 20
    },
   price:{
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
    updatedAt:{
        type: Date
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reviews'
    }],
    slug:{
        type: String
    }


});

productSchema.pre('save', function(next){
    if(!this.isNew) next();
   this.slug =  slugify(this.name, {
       replacement: '_',
       lower: true
   } )
    next();
})



const Product =  mongoose.model('Product', productSchema);

export default Product