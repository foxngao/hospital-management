const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const BenhNhan = require('../../models/BenhNhan');

const MedicalRecord = sequelize.define('HoSoBenhAn', {
    maHSBA: {
        type: DataTypes.STRING(100),
        primaryKey: true,
    },
    maBN: {
        type: DataTypes.STRING(100),
        allowNull: false,
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

MedicalRecord.belongsTo(BenhNhan, { foreignKey: 'maBN' });

module.exports = MedicalRecord;