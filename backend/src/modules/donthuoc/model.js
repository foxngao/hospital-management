const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");

// Bảng DonThuoc: đơn thuốc gắn với HSBA và bác sĩ
const DonThuoc = sequelize.define("DonThuoc", {
  maDT: { type: DataTypes.STRING, primaryKey: true },
  maHSBA: { type: DataTypes.STRING, allowNull: false },
  maBS: { type: DataTypes.STRING, allowNull: false },
  maThuoc: { type: DataTypes.STRING, allowNull: true }, // cho phép null
  ngayKeDon: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: "DonThuoc",
  timestamps: false,
});



// Bảng ChiTietDonThuoc: các thuốc kê trong đơn
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
