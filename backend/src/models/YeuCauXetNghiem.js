const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const BenhNhan = require('./BenhNhan');
const BacSi = require('./BacSi');

const YeuCauXetNghiem = sequelize.define('YeuCauXetNghiem', {
    maYeuCau: {
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
    loaiYeuCau: {
        type: DataTypes.STRING(20),
        defaultValue: 'THONG_THUONG',
    },
    ngayYeuCau: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
    trangThai: {
        type: DataTypes.STRING(20),
        defaultValue: 'CHO_THUC_HIEN',
    },
}, {
    tableName: 'YeuCauXetNghiem',
    timestamps: false,
});

YeuCauXetNghiem.belongsTo(BenhNhan, { foreignKey: 'maBN' });
YeuCauXetNghiem.belongsTo(BacSi, { foreignKey: 'maBS' });

module.exports = YeuCauXetNghiem;