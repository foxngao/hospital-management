const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const PhieuXetNghiem = sequelize.define("PhieuXetNghiem", {
  maPhieuXN: {
    type: DataTypes.STRING(100),
    primaryKey: true
  },
  maYeuCau: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  maXN: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  maNS: {
    type: DataTypes.STRING(100)
  },
  maHSBA: {
    type: DataTypes.STRING(100)
  },
  ngayThucHien: {
    type: DataTypes.DATE
  },
  ketQua: {
    type: DataTypes.TEXT
  },
  ghiChu: {
    type: DataTypes.TEXT
  },
}, {
  tableName: "PhieuXetNghiem",
  timestamps: false
});

PhieuXetNghiem.associate = (models) => {
  PhieuXetNghiem.belongsTo(models.YeuCauXetNghiem, { foreignKey: "maYeuCau" });
  PhieuXetNghiem.belongsTo(models.XetNghiem, { foreignKey: "maXN" });
  PhieuXetNghiem.belongsTo(models.NhanSuYTe, { foreignKey: "maNS" });
  PhieuXetNghiem.belongsTo(models.HoSoBenhAn, { foreignKey: "maHSBA" });
};

module.exports = PhieuXetNghiem;
