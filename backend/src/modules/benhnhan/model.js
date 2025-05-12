const db = require("../../models");
const { DataTypes } = require("sequelize");

const BenhNhan = db.sequelize.define("BenhNhan", {
  maBN: { type: DataTypes.STRING, primaryKey: true },
  maTK: { type: DataTypes.STRING },
  hoTen: { type: DataTypes.STRING },
  ngaySinh: { type: DataTypes.DATEONLY },
  gioiTinh: { type: DataTypes.STRING },
  diaChi: { type: DataTypes.STRING },
  soDienThoai: { type: DataTypes.STRING },
  bhyt: { type: DataTypes.STRING }
}, {
  tableName: "BenhNhan",
  timestamps: false,
});

BenhNhan.associate = (models) => {
  BenhNhan.belongsTo(models.TaiKhoan, { foreignKey: "maTK" });
};

module.exports = BenhNhan;
