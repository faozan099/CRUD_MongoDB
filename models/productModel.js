const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'please enter the name of a product']
        },
        quantity:{
            type: Number,
            required: true
        },
        image:{
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model("Products", productSchema)

module.exports = Product