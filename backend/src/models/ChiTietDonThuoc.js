const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const DonThuoc = require('./DonThuoc');
const Thuoc = require('./Thuoc');

const ChiTietDonThuoc = sequelize.define('ChiTietDonThuoc', {
    maCTDT: {
        type: DataTypes.STRING(100),
        primaryKey: true,
    },
    maDT: {
        type: DataTypes.STRING(100),
        allowNull: false,
        references: {
            model: DonThuoc,
            key: 'maDT',
        },
    },
    maThuoc: {
        type: DataTypes.STRING(100),
        allowNull: false,
        references: {
            model: Thuoc,
            key: 'maThuoc',
        },
    },
    soLuong: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    lieuDung: {
        type: DataTypes.STRING(255),
    },
}, {
    tableName: 'ChiTietDonThuoc',
    timestamps: false,
});

ChiTietDonThuoc.belongsTo(DonThuoc, { foreignKey: 'maDT' });
ChiTietDonThuoc.belongsTo(Thuoc, { foreignKey: 'maThuoc' });

module.exports = ChiTietDonThuoc;