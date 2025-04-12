const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const DonViTinh = require('./DonViTinh');
const NhomThuoc = require('./NhomThuoc');

const Thuoc = sequelize.define('Thuoc', {
    maThuoc: {
        type: DataTypes.STRING(100),
        primaryKey: true,
    },
    tenThuoc: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    tenHoatChat: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    hamLuong: {
        type: DataTypes.STRING(50),
    },
    maDVT: {
        type: DataTypes.STRING(100),
        allowNull: false,
        references: {
            model: DonViTinh,
            key: 'maDVT',
        },
    },
    maNhom: {
        type: DataTypes.STRING(100),
        allowNull: false,
        references: {
            model: NhomThuoc,
            key: 'maNhom',
        },
    },
    soDangKy: {
        type: DataTypes.STRING(50),
    },
    nuocSanXuat: {
        type: DataTypes.STRING(100),
    },
    hangSanXuat: {
        type: DataTypes.STRING(100),
    },
    giaNhap: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
    },
    giaBanLe: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
    },
    giaBanBuon: {
        type: DataTypes.DECIMAL(12, 2),
    },
    tonKhoToiThieu: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    tonKhoHienTai: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    hanSuDung: {
        type: DataTypes.INTEGER,
    },
    trangThai: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    tableName: 'Thuoc',
    timestamps: false,
});

Thuoc.belongsTo(DonViTinh, { foreignKey: 'maDVT' });
DonViTinh.hasMany(Thuoc, { foreignKey: 'maDVT' });

Thuoc.belongsTo(NhomThuoc, { foreignKey: 'maNhom' });
NhomThuoc.hasMany(Thuoc, { foreignKey: 'maNhom' });

module.exports = Thuoc;