/**
 * Order model.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    productName: String,
    price: Number,
    quantity: Number,
    username: String,
    email: String,
    createdAt: Date,
    updatedAt: Date
});

orderSchema.pre('save', function (next) {
    var currentDate = new Date();
  
    // Edit the updatedAt field to the current date
    if (!this.keepUpdatedDate) this.updatedAt = currentDate;

    // if createdAt doesn't exist, add to that field
    if (!this.createdAt) this.createdAt = currentDate;

    next();
});

var OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;
