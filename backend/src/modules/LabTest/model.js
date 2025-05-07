// src/modules/LabTest/model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");

const PhieuXetNghiem = sequelize.define("PhieuXetNghiem", {
  maPhieuXN: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  maBN: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  maLoaiXN: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ngayYeuCau: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW,
  },
  ketQua: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  trangThai: {
    type: DataTypes.ENUM("cho_ket_qua", "hoan_thanh"),
    defaultValue: "cho_ket_qua",
  },
});

module.exports = PhieuXetNghiem;
