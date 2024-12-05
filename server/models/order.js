const mongoose = require('mongoose')

const PurchaseSchema = mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    items:[{
        productId:{
            type: String,
            required: true
        },
        quantity:{
            type: Number,
            required:true
        }
    }],
    amount_paid:{
        type: Number,
        required: true
    },
    
},
{
    timestamps: true
});

const PurchaseModel = mongoose.model("Order", OrderSchema, "orders")

module.exports = OrderModel