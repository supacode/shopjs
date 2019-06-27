const Sequelize = require('sequelize');

const sequelize = require('../util/db');

const CartItem = sequelize.define('cart-item', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    quanity: Sequelize.INTEGER
});

module.exports = CartItem;