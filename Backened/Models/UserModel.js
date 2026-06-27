
const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,

    },
    cartData: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Produc",
                required: true
            },

            quantity: {
                type: Number,
                default: 1
            },

            size: {
                type: String,
                required: true
            }
        }
    ]
}, { timestamps: true })

const User = mongoose.model('User', UserSchema)

module.exports = User