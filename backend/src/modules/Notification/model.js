const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Notification = sequelize.define('Notification', {
    maThongBao: {
        type: DataTypes.STRING(100),
        primaryKey: true,
    },
    maNguoiNhan: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    noiDung: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    ngayGui: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
    daDoc: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    tableName: 'Notification',
    timestamps: false,
});

module.exports = Notification;