const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const YeuCauXetNghiem = require('./YeuCauXetNghiem');
const XetNghiem = require('./XetNghiem');
const NhanSuYTe = require('./NhanSuYTe');
const HoSoBenhAn = require('./HoSoBenhAn');

const PhieuXetNghiem = sequelize.define('PhieuXetNghiem', {
    maPhieuXN: {
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
    maNS: {
        type: DataTypes.STRING(100),
        references: {
            model: NhanSuYTe,
            key: 'maNS',
        },
    },
    maHSBA: {
        type: DataTypes.STRING(100),
        references: {
            model: HoSoBenhAn,
            key: 'maHSBA',
        },
    },
    ngayThucHien: {
        type: DataTypes.DATE,
    },
    ketQua: {
        type: DataTypes.TEXT,
    },
    hinhAnh: {
        type: DataTypes.STRING(255),
    },
}, {
    tableName: 'PhieuXetNghiem',
    timestamps: false,
});

PhieuXetNghiem.belongsTo(YeuCauXetNghiem, { foreignKey: 'maYeuCau' });
PhieuXetNghiem.belongsTo(XetNghiem, { foreignKey: 'maXN' });
PhieuXetNghiem.belongsTo(NhanSuYTe, { foreignKey: 'maNS' });
PhieuXetNghiem.belongsTo(HoSoBenhAn, { foreignKey: 'maHSBA' });

module.exports = PhieuXetNghiem;