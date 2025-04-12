const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const HoaDon = require('./HoaDon');

const ChiTietHoaDon = sequelize.define('ChiTietHoaDon', {
    maCTHD: {
        type: DataTypes.STRING(100),
        primaryKey: true,
    },
    maHD: {
        type: DataTypes.STRING(100),
        allowNull: false,
        references: {
            model: HoaDon,
            key: 'maHD',
        },
    },
    loaiDichVu: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    maDichVu: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    donGia: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
    },
    soLuong: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    thanhTien: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
    },
}, {
    tableName: 'ChiTietHoaDon',
    timestamps: false,
});

ChiTietHoaDon.belongsTo(HoaDon, { foreignKey: 'maHD' });

module.exports = ChiTietHoaDon;