const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const PhanHoi = sequelize.define('PhanHoi', {
  maPH: {
    type: DataTypes.STRING(100),
    primaryKey: true
  },
  maBN: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  noiDung: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  ngayGui: {
    type: DataTypes.DATE,
    allowNull: false
  },
  trangThai: {
    type: DataTypes.STRING(20)
  }
}, {
  tableName: 'PhanHoi',
  timestamps: false
});

PhanHoi.associate = (models) => {
  PhanHoi.belongsTo(models.BenhNhan, { foreignKey: 'maBN' });
};

module.exports = PhanHoi;
