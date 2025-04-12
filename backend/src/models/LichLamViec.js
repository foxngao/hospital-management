const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const NhanSuYTe = require('./NhanSuYTe');
const CaKham = require('./CaKham');

const LichLamViec = sequelize.define('LichLamViec', {
    maLichLV: {
        type: DataTypes.STRING(100),
        primaryKey: true,
    },
    maNS: {
        type: DataTypes.STRING(100),
        allowNull: false,
        references: {
            model: NhanSuYTe,
            key: 'maNS',
        },
    },
    maCa: {
        type: DataTypes.STRING(100),
        allowNull: false,
        references: {
            model: CaKham,
            key: 'maCa',
        },
    },
    ngayLamViec: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'LichLamViec',
    timestamps: false,
});

LichLamViec.belongsTo(NhanSuYTe, { foreignKey: 'maNS' });
LichLamViec.belongsTo(CaKham, { foreignKey: 'maCa' });

module.exports = LichLamViec;