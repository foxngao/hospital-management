const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const NhanSuYTe = require('./NhanSuYTe');

const TinTuc = sequelize.define('TinTuc', {
    maTin: {
        type: DataTypes.STRING(100),
        primaryKey: true,
    },
    tieuDe: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    noiDung: {
        type: DataTypes.TEXT,
    },
    ngayDang: {
        type: DataTypes.DATE,
        allowNull: false,
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
    tableName: 'TinTuc',
    timestamps: false,
});

TinTuc.belongsTo(NhanSuYTe, { foreignKey: 'maNS' });

module.exports = TinTuc;