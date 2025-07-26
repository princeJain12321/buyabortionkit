import Order from '../models/orderModel.js';
import asyncHandler from '../middleware/asyncHandler.js';

// @desc Create new order
// @route POST /api/orders
// @access Private
const addOrderItems = async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
    if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      orderItems: orderItems.map(item => ({
        ...item,
        product: item._id,  // Assuming item._id is the product ID
        _id: undefined  // Remove the _id field to avoid conflicts
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
}

// @desc Get Logged in user's orders
// @route GET /api/orders/myorders
// @access Private
const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
}

// @desc Get Logged in user's orders
// @route GET /api/orders/:id
// @access Private
const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
    
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
}

// @desc Update order to paid
// @route PUT /api/orders/:id/pay
// @access Private
const updateOrderToPaid = async (req, res) => {
  res.send('Update order to paid');
}

// @desc Update order to delivered
// @route PUT /api/orders/:id/deliver
// @access Private/Admin
const updateOrderToDelivered = async (req, res) => {
  const order = await Order.findById(req.params.id);
    if (order) {
    order.isDelivered = true;   
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
}

// @desc Get all orders
// @route GET /api/orders
// @access Private/Admin
const getOrders = async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.status(200).json(orders);
}

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
}