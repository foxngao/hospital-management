const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const TaiKhoan = require('./TaiKhoan');

const UyQuyen = sequelize.define('UyQuyen', {
    maUyQuyen: {
        type: DataTypes.STRING(100),
        primaryKey: true,
    },
    maNguoiUyQuyen: {
        type: DataTypes.STRING(100),
        allowNull: false,
        references: {
            model: TaiKhoan,
            key: 'maTK',
        },
    },
    maNguoiDuocUyQuyen: {
        type: DataTypes.STRING(100),
        allowNull: false,
        references: {
            model: TaiKhoan,
            key: 'maTK',
        },
    },
    loaiUyQuyen: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    thoiGianBatDau: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    thoiGianKetThuc: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    moTa: {
        type: DataTypes.TEXT,
    },
}, {
    tableName: 'UyQuyen',
    timestamps: false,
});

UyQuyen.belongsTo(TaiKhoan, { foreignKey: 'maNguoiUyQuyen', as: 'NguoiUyQuyen' });
UyQuyen.belongsTo(TaiKhoan, { foreignKey: 'maNguoiDuocUyQuyen', as: 'NguoiDuocUyQuyen' });

module.exports = UyQuyen;