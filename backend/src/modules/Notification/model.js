const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");

const ThongBao = sequelize.define("ThongBao", {
  maTB: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  tieuDe: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  noiDung: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  daDoc: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  maNguoiNhan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  thoiGian: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  loaiThongBao: {
    type: DataTypes.ENUM("he_thong", "ca_nhan"),
    defaultValue: "ca_nhan",
  },
});

module.exports = ThongBao;
