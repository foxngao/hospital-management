// MODEL: Định nghĩa bảng DonThuoc và ChiTietDonThuoc từ Hospital5.sql
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");

const DonThuoc = sequelize.define("DonThuoc", {
  maDT: { type: DataTypes.STRING, primaryKey: true },
  maHSBA: { type: DataTypes.STRING, allowNull: false },
  maBS: { type: DataTypes.STRING, allowNull: false },
  maThuoc: { type: DataTypes.STRING, allowNull: false },
  ngayKeDon: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: "DonThuoc",
  timestamps: false,
});

const ChiTietDonThuoc = sequelize.define("ChiTietDonThuoc", {
  maCTDT: { type: DataTypes.STRING, primaryKey: true },
  maDT: { type: DataTypes.STRING, allowNull: false },
  maThuoc: { type: DataTypes.STRING, allowNull: false },
  soLuong: { type: DataTypes.INTEGER, allowNull: false },
  lieuDung: { type: DataTypes.STRING },
}, {
  tableName: "ChiTietDonThuoc",
  timestamps: false,
});

module.exports = { DonThuoc, ChiTietDonThuoc };
