const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const YeuCauXetNghiem = require('./YeuCauXetNghiem');
const XetNghiem = require('./XetNghiem');

const ChiTietYeuCauXN = sequelize.define('ChiTietYeuCauXN', {
    maCT: {
        type: DataTypes.STRING(100),
        primaryKey: true,
    },
    maYeuCau: {
        type: DataTypes.STRING(100),
        allowNull: false,
        references: {
            model: YeuCauXetNghiem,
            key: 'maYeuCau',
        },
    },
    maXN: {
        type: DataTypes.STRING(100),
        allowNull: false,
        references: {
            model: XetNghiem,
            key: 'maXN',
        },
    },
}, {
    tableName: 'ChiTietYeuCauXN',
    timestamps: false,
});

ChiTietYeuCauXN.belongsTo(YeuCauXetNghiem, { foreignKey: 'maYeuCau' });
ChiTietYeuCauXN.belongsTo(XetNghiem, { foreignKey: 'maXN' });

module.exports = ChiTietYeuCauXN;