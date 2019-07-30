const mongoose = require('mongoose');
const Schema = mongoose.Schema;

userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    cart: {
        items: [{
            productId: {
                type: Schema.Types.ObjectId,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }]
    }
});

module.exports = mongoose.model('User', userSchema);