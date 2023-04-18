/**
 * Order service for CRUD operations.
 */
const cacheService = require('./cache');
const OrderModel = require("../models/order");

exports.create = async (data) => {
    if (!data) return Promise.reject('Invalid order!');

    const cachedUser = await cacheService.readUser(data.userId);
    if (!cachedUser) return Promise.reject('Invalid user provided!');
    
    const order = new OrderModel({ ...data, username: cachedUser.username, email: cachedUser.email });
    await order.save();

    await cacheService.cacheOrder(order); // Update cache once the DB change is done
    return order;
}

exports.findById = async (orderId) => {
    const cachedOrder = await cacheService.readOrder(orderId);
    if (!cachedOrder) {
        await new Promise(resolve => setTimeout(resolve, 3500));    // Wait for 5 seconds to show cache miss event
        
        console.log(`Cache miss for findById on order#${orderId}`);
        const orderFound = await OrderModel.findById(orderId);

        console.log('Data loaded from the DB and cached');
        await cacheService.cacheOrder(orderFound); // Update cache once the DB change is done

        return orderFound;
    }
    console.log(`Cache hit for findById on order#${orderId}`);
    return cachedOrder;
}

exports.findAll = async () => {
    return OrderModel.find();
}

exports.update = async (orderId, data) => {
    if (!data) return;
    delete data._id;
    await OrderModel.findByIdAndUpdate(orderId, data);
    const orderFound = await OrderModel.findById(orderId);
    await cacheService.cacheOrder(orderFound); // Update cache once the DB change is done
    return orderFound;
}

exports.delete = async (orderId) => {
    const orderFound = await OrderModel.findById(orderId);
    if (orderFound) {
        await orderFound.remove();
        console.log('order deleted from DB');
        cacheService.deleteOrder(orderFound); // Delete cache once the DB change is done
    }
}
