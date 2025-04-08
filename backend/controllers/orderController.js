import Order from '../models/Order.js';

export const placeOrder = async (req, res) => {
  const order = await Order.create({ ...req.body, userId: req.user.id });
  // attaching logged in userid to the order placed 
  //insql known as primarkey with orderplace+userid
  //this order is of this user id will be stored because req.user=decoded will be sent by jwt tokken while verification
  res.status(201).json(order);
};

export const getUserOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user.id });
  //finding the orders by particular userid i.e the user which is logged in
  res.json(orders);
};

export const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate('userId');
  //getting the orders from database with userid ,
  res.json(orders);
};
