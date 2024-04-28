const Address = require("../models/addressModel.js");
const cartService = require("../services/cart.service.js")
async function createOrder(user, shippAddress) {
    let address;
    if (shippAddress._id) {
        let existAddress = await Address.findById(shippAddress._id)
        address = existAddress;
    }
    else {
        address = new Address(shippAddress);
        address.user = user;
        await address.save();
        user.addresses.push(address);
        await user.save();
    }

    const cart = await cartService.findUserCart(user._id);
    const orderItems = []; I
    for (const item of cart.cartItems) {
        const orderItem = new orderItems({
            price: item.price,
            product: item.product,
            quantity: item.quantity,
            size: item.size,
            userId: item.userId,
            discountedPrice: item.discountedPrice,
        })
        const createdOrderItem = await orderItem.save();
        orderItems.push(createdOrderItem)
    }

    const createOrder = new Order({
        user,
        orderItems,
        totalPrice: cart.totalPrice,
        totalDiscountedPrice: cart.totalDiscountedPrice,
        discounte: cart.discounte,
        totalItem: cart.totalItem,
        shippAddress: address,
    })
    const savedOrder = await createOrder.save();
    return savedOrder;
}

async function placeOrder(orderId) {
    const order = await findOrderById(orderId);
    order.orderStatus = "PLACED";
    order.paymentDetails.status = "COMPLETED";
    return await order.save();
}

async function confirmOrder(orderId) {
    const order = await findOrderById(orderId);
    order.orderStatus = "CONFIRMED";

    return await order.save();
}

async function shipOrder(orderId) {
    const order = await findOrderById(orderId);
    order.orderStatus = "SHIPED";

    return await order.save();
}

async function deliverOrder(orderId) {
    const order = await findOrderById(orderId);
    order.orderStatus = "DELIVERED";

    return await order.save();
}


async function cancellOrder(orderId) {
    const order = await findOrderById(orderId);
    order.orderStatus = "CANCELLED";

    return await order.save();
}

async function findOrderById(orderId) {
    const order = await Order.findById(orderId).
        populate("user")
        .populate({ path: "order Items", populate: { path: "product" } })
        .populate("shippingAddress")
    return order
}


async function usersOrderHistory(userId) {
    try {
        const orders = await Order.find({ user: userId, orderStatus: "PLACED" })
            .populate({ path: "order Items", populate: { path: "product" } }).lean()
        return orders;
    } catch (error) {
        throw new Error(error.message)
    }
}
async function getAllOrders() {
    return await Order.find()
        .populate({ path: "orderItems", populate: { path: "product" } }).lean()
}


async function deleteOrder(orderId) {
    const order = await findOrderById(orderId);
    await Order.findAndDelete(order._id);
}

module.exports = {
    createOrder, placeOrder, confirmOrder, shipOrder, deleteOrder, cancellOrder, getAllOrders,usersOrderHistory,deliverOrder
}