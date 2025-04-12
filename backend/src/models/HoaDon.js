const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const BenhNhan = require('./BenhNhan');
const NhanSuYTe = require('./NhanSuYTe');

const HoaDon = sequelize.define('HoaDon', {
    maHD: {
        type: DataTypes.STRING(100),
        primaryKey: true,
    },
    maBN: {
        type: DataTypes.STRING(100),
        allowNull: false,
        references: {
            model: BenhNhan,
            key: 'maBN',
        },
    },
    ngayLap: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
    tongTien: {
        type: DataTypes.DECIMAL(15, 2),
        defaultValue: 0,
    },
    trangThai: {
        type: DataTypes.STRING(20),
        defaultValue: 'CHUA_THANH_TOAN',
    },
    maNS: {
        type: DataTypes.STRING(100),
        allowNull: false,
        references: {
            model: NhanSuYTe,
            key: 'maNS',
        },
    },
}, {
    tableName: 'HoaDon',
    timestamps: false,
});

HoaDon.belongsTo(BenhNhan, { foreignKey: 'maBN' });
HoaDon.belongsTo(NhanSuYTe, { foreignKey: 'maNS' });

module.exports = HoaDon;