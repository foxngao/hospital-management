const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const BenhNhan = require('./BenhNhan');
const BacSi = require('./BacSi');
const CaKham = require('./CaKham');

const LichHen = sequelize.define('LichHen', {
    maLH: {
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
    maBS: {
        type: DataTypes.STRING(100),
        references: {
            model: BacSi,
            key: 'maBS',
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
    ngayHen: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    trangThai: {
        type: DataTypes.STRING(20),
        defaultValue: 'ChoXacNhan',
    },
}, {
    tableName: 'LichHen',
    timestamps: false,
});

LichHen.belongsTo(BenhNhan, { foreignKey: 'maBN' });
LichHen.belongsTo(BacSi, { foreignKey: 'maBS' });
LichHen.belongsTo(CaKham, { foreignKey: 'maCa' });

module.exports = LichHen;