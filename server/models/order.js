const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
     productId:{
            type: String,
            required: true
        },
    quantity:{
            type: Number,
            required:true
        }
,
    amount_paid:{
        type: Number,
        required: true
    },
    
},
{
    timestamps: true
});

const Order = mongoose.model("Order", OrderSchema, "orders")

module.exports = Order