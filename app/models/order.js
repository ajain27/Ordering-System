var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Order', {
    food: {
        type: Schema.Types.ObjectId,
        ref: 'Food'
    },
    price: {
    	type: Number,
    	default: 0
    }
});