const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const TaiKhoan = require('./TaiKhoan');
const KhoaPhong = require('./KhoaPhong');

const BacSi = sequelize.define('BacSi', {
    maBS: {
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
        allowNull: false,
        references: {
            model: KhoaPhong,
            key: 'maKhoa',
        },
    },
    hoTen: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    chuyenMon: {
        type: DataTypes.STRING(100),
    },
    chucVu: {
        type: DataTypes.STRING(100),
    },
    trinhDo: {
        type: DataTypes.STRING(50),
    },
}, {
    tableName: 'BacSi',
    timestamps: false,
});

BacSi.belongsTo(TaiKhoan, { foreignKey: 'maTK' });
TaiKhoan.hasOne(BacSi, { foreignKey: 'maTK' });

BacSi.belongsTo(KhoaPhong, { foreignKey: 'maKhoa' });
KhoaPhong.hasMany(BacSi, { foreignKey: 'maKhoa' });

module.exports = BacSi;