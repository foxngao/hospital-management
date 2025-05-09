const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const BenhNhan = sequelize.define('BenhNhan', {
  maBN: {
    type: DataTypes.STRING(100),
    primaryKey: true
  },
  maTK: {
    type: DataTypes.STRING(100),
    unique: true
  },
  hoTen: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  ngaySinh: {
    type: DataTypes.DATE
  },
  gioiTinh: {
    type: DataTypes.STRING(10)
  },
  diaChi: {
    type: DataTypes.STRING(255)
  },
  soDienThoai: {
    type: DataTypes.STRING(15)
  },
  bhyt: {
    type: DataTypes.STRING(20)
  }
}, {
  tableName: 'BenhNhan',
  timestamps: false
});

BenhNhan.associate = (models) => {
  BenhNhan.belongsTo(models.TaiKhoan, { foreignKey: 'maTK' });
};

module.exports = BenhNhan;
