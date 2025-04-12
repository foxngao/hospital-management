const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const HoSoBenhAn = require('./HoSoBenhAn');
const BacSi = require('./BacSi');
const Thuoc = require('./Thuoc');

const DonThuoc = sequelize.define('DonThuoc', {
    maDT: {
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
    maBS: {
        type: DataTypes.STRING(100),
        allowNull: false,
        references: {
            model: BacSi,
            key: 'maBS',
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
    ngayKeDon: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
}, {
    tableName: 'DonThuoc',
    timestamps: false,
});

DonThuoc.belongsTo(HoSoBenhAn, { foreignKey: 'maHSBA' });
DonThuoc.belongsTo(BacSi, { foreignKey: 'maBS' });
DonThuoc.belongsTo(Thuoc, { foreignKey: 'maThuoc' });

module.exports = DonThuoc;