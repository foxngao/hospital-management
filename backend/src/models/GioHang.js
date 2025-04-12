const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const BenhNhan = require('./BenhNhan');

const GioHang = sequelize.define('GioHang', {
    maGH: {
        type: DataTypes.STRING(100),
        primaryKey: true,
    },
    maBN: {
        type: DataTypes.STRING(100),
        allowNull: false,
        references: {
            model: BenhNhan,
            key: 'maBN',
        },
    },
    ngayTao: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
    trangThai: {
        type: DataTypes.STRING(20),
        defaultValue: 'CHO_THANH_TOAN',
    },
}, {
    tableName: 'GioHang',
    timestamps: false,
});

GioHang.belongsTo(BenhNhan, { foreignKey: 'maBN' });

module.exports = GioHang;