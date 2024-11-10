const { Order, OrderItem, Product, sequelize } = require('../models');

exports.createOrder = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { total_amount, items, shipping_address, payment_info } = req.body;
    const userId = req.user?.id; // Ensure this matches the user ID field in your User model

    // Validate user
    if (!userId) {
      throw new Error('User ID is required');
    }

    // Convert payment_info to string if it's an object
    const stringifiedPaymentInfo = typeof payment_info === 'object' 
      ? JSON.stringify(payment_info) 
      : payment_info;

    // Check inventory
    for (let item of items) {
      const product = await Product.findByPk(item.product_id);
      if (!product || product.stock_quantity < item.quantity) {
        throw new Error(`Insufficient stock for product ${item.product_id}`);
      }
    }

    const order = await Order.create({
      user_id: userId,
      total_amount,
      status: 'pending',
      shipping_address,
      payment_info: stringifiedPaymentInfo
    }, { transaction: t });

    const orderItems = items.map(item => ({
      order_id: order.order_id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price
    }));

    await OrderItem.bulkCreate(orderItems, { transaction: t });

    // Update inventory
    for (let item of items) {
      await Product.decrement('stock_quantity', { 
        by: item.quantity, 
        where: { product_id: item.product_id },
        transaction: t
      });
    }

    await t.commit();
    res.status(201).json({ message: 'Order created successfully', order_id: order.order_id });
  } catch (error) {
    await t.rollback();
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.userId; // Assuming you have user authentication and userId is available

    const orders = await Order.findAll({
      where: { user_id: userId },
      include: [
        {
          model: OrderItem,
          include: [{ model: Product, attributes: ['name', 'price', 'image_url'] }]
        }
      ],
      order: [['created_at', 'DESC']] // Use the correct column name
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.userId;

    if (!orderId) {
      return res.status(400).json({ message: 'Order ID is required' });
    }

    const order = await Order.findOne({
      where: { 
        order_id: orderId,
        user_id: userId
      },
      include: [
        {
          model: OrderItem,
          include: [{ model: Product, attributes: ['name', 'price', 'image_url'] }]
        }
      ]
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
