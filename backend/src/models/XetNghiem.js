const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const LoaiXetNghiem = require('./LoaiXetNghiem');

const XetNghiem = sequelize.define('XetNghiem', {
    maXN: {
        type: DataTypes.STRING(100),
        primaryKey: true,
    },
    maLoaiXN: {
        type: DataTypes.STRING(100),
        allowNull: false,
        references: {
            model: LoaiXetNghiem,
            key: 'maLoaiXN',
        },
    },
    tenXN: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    chiPhi: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
    },
    thoiGianTraKetQua: {
        type: DataTypes.STRING(100),
    },
}, {
    tableName: 'XetNghiem',
    timestamps: false,
});

XetNghiem.belongsTo(LoaiXetNghiem, { foreignKey: 'maLoaiXN' });
LoaiXetNghiem.hasMany(XetNghiem, { foreignKey: 'maLoaiXN' });

module.exports = XetNghiem;