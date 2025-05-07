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
        references: { // Thêm khóa ngoại
            model: 'BenhNhan',
            key: 'maBN'
        }
    },
    maBS: {
        type: DataTypes.STRING(100),
        references: { // Thêm khóa ngoại
            model: 'BacSi',
            key: 'maBS'
        }
    },
    maCa: {
        type: DataTypes.STRING(100),
        allowNull: false,
        references: { // Thêm khóa ngoại
            model: 'CaKham',
            key: 'maCa'
        }
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

// Thêm phần associate
Appointment.associate = (models) => {
    Appointment.belongsTo(models.BenhNhan, { foreignKey: 'maBN' });
    Appointment.belongsTo(models.BacSi, { foreignKey: 'maBS' });
    Appointment.belongsTo(models.CaKham, { foreignKey: 'maCa' });
};

module.exports = Appointment;