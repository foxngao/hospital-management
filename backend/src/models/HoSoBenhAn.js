const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const BenhNhan = require('./BenhNhan');

const HoSoBenhAn = sequelize.define('HoSoBenhAn', {
    maHSBA: {
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
    dotKhamBenh: {
        type: DataTypes.DATE,
    },
    lichSuBenh: {
        type: DataTypes.TEXT,
    },
    ghiChu: {
        type: DataTypes.TEXT,
    },
}, {
    tableName: 'HoSoBenhAn',
    timestamps: false,
});

HoSoBenhAn.belongsTo(BenhNhan, { foreignKey: 'maBN' });
BenhNhan.hasMany(HoSoBenhAn, { foreignKey: 'maBN' });

module.exports = HoSoBenhAn;