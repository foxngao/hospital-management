const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const NhomQuyen = require('./NhomQuyen');

const TaiKhoan = sequelize.define('TaiKhoan', {
    maTK: {
        type: DataTypes.STRING(100),
        primaryKey: true,
    },
    tenDangNhap: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    matKhau: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        unique: true,
    },
    maNhanVien: { // Thêm trường mã nhân viên cho bác sĩ/nhân sự
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: true, // Chỉ bắt buộc với bác sĩ/nhân sự
    },
    trangThai: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    maNhom: {
        type: DataTypes.STRING(100),
        allowNull: false,
        references: {
            model: NhomQuyen,
            key: 'maNhom',
        },
    },
}, {
    tableName: 'TaiKhoan',
    timestamps: false,
});

TaiKhoan.belongsTo(NhomQuyen, { foreignKey: 'maNhom' });
NhomQuyen.hasMany(TaiKhoan, { foreignKey: 'maNhom' });

module.exports = TaiKhoan;