const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const GioHang = require('./GioHang');

const ChiTietGioHang = sequelize.define('ChiTietGioHang', {
    maCTGH: {
        type: DataTypes.STRING(100),
        primaryKey: true,
    },
    maGH: {
        type: DataTypes.STRING(100),
        allowNull: false,
        references: {
            model: GioHang,
            key: 'maGH',
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
    tableName: 'ChiTietGioHang',
    timestamps: false,
});

ChiTietGioHang.belongsTo(GioHang, { foreignKey: 'maGH' });

module.exports = ChiTietGioHang;