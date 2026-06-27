
const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    items: {
        type: Array,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    address: {
        type: Object,
        required: true
    },

    status: {
        type: String,
        default: "Order Placed"
    },

    paymentMethoud: {
        type: String,
        required: true
    },

    payment: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });
const Order = mongoose.model('Order', OrderSchema)

module.exports = Order