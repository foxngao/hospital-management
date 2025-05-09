const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const NhanSuYTe = sequelize.define('NhanSuYTe', {
  maNS: {
    type: DataTypes.STRING(100),
    primaryKey: true
  },
  maTK: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  maKhoa: {
    type: DataTypes.STRING(100)
  },
  hoTen: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  loaiNS: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  chuyenMon: {
    type: DataTypes.STRING(100)
  },
  capBac: {
    type: DataTypes.STRING(50)
  }
}, {
  tableName: 'NhanSuYTe',
  timestamps: false
});

NhanSuYTe.associate = (models) => {
  NhanSuYTe.belongsTo(models.TaiKhoan, { foreignKey: 'maTK' });
  NhanSuYTe.belongsTo(models.KhoaPhong, { foreignKey: 'maKhoa' });
};

module.exports = NhanSuYTe;
