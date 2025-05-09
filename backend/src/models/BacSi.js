const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const BacSi = sequelize.define('BacSi', {
  maBS: {
    type: DataTypes.STRING(100),
    primaryKey: true
  },
  maTK: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  maKhoa: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  hoTen: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  chuyenMon: {
    type: DataTypes.STRING(100)
  },
  chucVu: {
    type: DataTypes.STRING(100)
  },
  trinhDo: {
    type: DataTypes.STRING(50)
  }
}, {
  tableName: 'BacSi',
  timestamps: false
});

BacSi.associate = (models) => {
  BacSi.belongsTo(models.TaiKhoan, { foreignKey: 'maTK' });
  BacSi.belongsTo(models.KhoaPhong, { foreignKey: 'maKhoa' });
};

module.exports = BacSi;
