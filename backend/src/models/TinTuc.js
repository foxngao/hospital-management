const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const TinTuc = sequelize.define('TinTuc', {
  maTin: {
    type: DataTypes.STRING(100),
    primaryKey: true
  },
  tieuDe: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  noiDung: {
    type: DataTypes.TEXT
  },
  ngayDang: {
    type: DataTypes.DATE,
    allowNull: false
  },
  maNS: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'TinTuc',
  timestamps: false
});

TinTuc.associate = (models) => {
  TinTuc.belongsTo(models.NhanSuYTe, { foreignKey: 'maNS' });
};

module.exports = TinTuc;
