const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const TaiKhoan = require('../auth/model');
const KhoaPhong = require('../../models/KhoaPhong');

const User = sequelize.define('User', {
    maUser: {
        type: DataTypes.STRING(100),
        primaryKey: true,
    },
    hoTen: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    loaiUser: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
}, {
    tableName: 'User',
    timestamps: false,
});

// Quan hệ với TaiKhoan và KhoaPhong
User.belongsTo(TaiKhoan, { foreignKey: 'maTK', targetKey: 'maTK' });
User.belongsTo(KhoaPhong, { foreignKey: 'maKhoa', targetKey: 'maKhoa' });

module.exports = User;