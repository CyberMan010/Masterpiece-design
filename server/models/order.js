module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending'
    },
    shipping_address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    payment_info: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'orders',
    timestamps: false
  });

  Order.associate = (models) => {
    Order.belongsTo(models.User, { foreignKey: 'user_id' });
    Order.hasMany(models.OrderItem, { foreignKey: 'order_id' });
  };

  return Order;
};
