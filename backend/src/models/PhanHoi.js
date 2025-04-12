const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const BenhNhan = require('./BenhNhan');

const PhanHoi = sequelize.define('PhanHoi', {
    maPH: {
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
    noiDung: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    ngayGui: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    trangThai: {
        type: DataTypes.STRING(20),
    },
}, {
    tableName: 'PhanHoi',
    timestamps: false,
});

PhanHoi.belongsTo(BenhNhan, { foreignKey: 'maBN' });

module.exports = PhanHoi;