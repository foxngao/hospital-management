const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const TaiKhoan = require('./TaiKhoan');
const KhoaPhong = require('./KhoaPhong');

const NhanSuYTe = sequelize.define('NhanSuYTe', {
    maNS: {
        type: DataTypes.STRING(100),
        primaryKey: true,
    },
    maTK: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        references: {
            model: TaiKhoan,
            key: 'maTK',
        },
    },
    maKhoa: {
        type: DataTypes.STRING(100),
        references: {
            model: KhoaPhong,
            key: 'maKhoa',
        },
    },
    hoTen: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    loaiNS: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    chuyenMon: {
        type: DataTypes.STRING(100),
    },
    capBac: {
        type: DataTypes.STRING(50),
    },
}, {
    tableName: 'NhanSuYTe',
    timestamps: false,
});

NhanSuYTe.belongsTo(TaiKhoan, { foreignKey: 'maTK' });
TaiKhoan.hasOne(NhanSuYTe, { foreignKey: 'maTK' });

NhanSuYTe.belongsTo(KhoaPhong, { foreignKey: 'maKhoa' });
KhoaPhong.hasMany(NhanSuYTe, { foreignKey: 'maKhoa' });

module.exports = NhanSuYTe;