const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const HoSoBenhAn = require('./HoSoBenhAn');
const BenhNhan = require('./BenhNhan');
const BacSi = require('./BacSi');

const PhieuKham = sequelize.define('PhieuKham', {
    maPK: {
        type: DataTypes.STRING(100),
        primaryKey: true,
    },
    maHSBA: {
        type: DataTypes.STRING(100),
        allowNull: false,
        references: {
            model: HoSoBenhAn,
            key: 'maHSBA',
        },
    },
    maBN: {
        type: DataTypes.STRING(100),
        allowNull: false,
        references: {
            model: BenhNhan,
            key: 'maBN',
        },
    },
    maBS: {
        type: DataTypes.STRING(100),
        allowNull: false,
        references: {
            model: BacSi,
            key: 'maBS',
        },
    },
    ngayKham: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
    trieuChung: {
        type: DataTypes.TEXT,
    },
    chuanDoan: {
        type: DataTypes.TEXT,
    },
    loiDan: {
        type: DataTypes.TEXT,
    },
    trangThai: {
        type: DataTypes.STRING(50),
        defaultValue: 'DA_KHAM',
    },
}, {
    tableName: 'PhieuKham',
    timestamps: false,
});

PhieuKham.belongsTo(HoSoBenhAn, { foreignKey: 'maHSBA' });
PhieuKham.belongsTo(BenhNhan, { foreignKey: 'maBN' });
PhieuKham.belongsTo(BacSi, { foreignKey: 'maBS' });

module.exports = PhieuKham;