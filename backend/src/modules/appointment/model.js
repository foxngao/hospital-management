const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const BenhNhan = require('../../models/BenhNhan');
const BacSi = require('../../models/BacSi');
const CaKham = require('../../models/CaKham');

const Appointment = sequelize.define('LichHen', {
    maLH: {
        type: DataTypes.STRING(100),
        primaryKey: true,
    },
    maBN: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    maBS: {
        type: DataTypes.STRING(100),
    },
    maCa: {
        type: DataTypes.STRING(100),
        allowNull: false,
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

Appointment.belongsTo(BenhNhan, { foreignKey: 'maBN' });
Appointment.belongsTo(BacSi, { foreignKey: 'maBS' });
Appointment.belongsTo(CaKham, { foreignKey: 'maCa' });

module.exports = Appointment;