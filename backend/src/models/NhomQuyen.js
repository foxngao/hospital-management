const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const NhomQuyen = sequelize.define('NhomQuyen', {
    maNhom: {
        type: DataTypes.STRING(100),
        primaryKey: true,
    },
    tenNhom: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    moTa: {
        type: DataTypes.STRING(255),
    },
}, {
    tableName: 'NhomQuyen',
    timestamps: false,
});

module.exports = NhomQuyen;