const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const DonThuoc = sequelize.define('DonThuoc', {
  maDT: {
    type: DataTypes.STRING(100),
    primaryKey: true
  },
  maHSBA: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  maBS: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  maThuoc: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  ngayKeDon: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'DonThuoc',
  timestamps: false
});

DonThuoc.associate = (models) => {
  DonThuoc.belongsTo(models.HoSoBenhAn, { foreignKey: 'maHSBA' });
  DonThuoc.belongsTo(models.BacSi, { foreignKey: 'maBS' });
  DonThuoc.belongsTo(models.Thuoc, { foreignKey: 'maThuoc' });
};

module.exports = DonThuoc;
