const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const LichHen = sequelize.define('LichHen', {
  maLH: {
    type: DataTypes.STRING(100),
    primaryKey: true
  },
  maBN: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  maBS: {
    type: DataTypes.STRING(100)
  },
  maCa: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  ngayHen: {
    type: DataTypes.DATE,
    allowNull: false
  },
  trangThai: {
    type: DataTypes.STRING(20),
    defaultValue: 'ChoXacNhan'
  }
}, {
  tableName: 'LichHen',
  timestamps: false
});

LichHen.associate = (models) => {
  LichHen.belongsTo(models.BenhNhan, { foreignKey: 'maBN' });
  LichHen.belongsTo(models.BacSi, { foreignKey: 'maBS' });
  LichHen.belongsTo(models.CaKham, { foreignKey: 'maCa' });
};

module.exports = LichHen;
