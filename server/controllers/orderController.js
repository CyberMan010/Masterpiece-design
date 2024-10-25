const { Order, OrderItem, Product, sequelize } = require('../models');

exports.createOrder = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { total_amount, items, shipping_address, payment_info } = req.body;
    const userId = req.user.id;

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
      payment_info
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
