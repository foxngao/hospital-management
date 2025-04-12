const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Thuoc = require('./Thuoc');

const ThanhPhanThuoc = sequelize.define('ThanhPhanThuoc', {
    maThanhPhan: {
        type: DataTypes.STRING(100),
        primaryKey: true,
    },
    maThuoc: {
        type: DataTypes.STRING(100),
        allowNull: false,
        references: {
            model: Thuoc,
            key: 'maThuoc',
        },
    },
    tenHoatChat: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    hamLuong: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    donViTinh: {
        type: DataTypes.STRING(20),
    },
}, {
    tableName: 'ThanhPhanThuoc',
    timestamps: false,
});

ThanhPhanThuoc.belongsTo(Thuoc, { foreignKey: 'maThuoc' });
Thuoc.hasMany(ThanhPhanThuoc, { foreignKey: 'maThuoc' });

module.exports = ThanhPhanThuoc;