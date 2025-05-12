// MODEL: Định nghĩa bảng LichLamViec từ CSDL Hospital5.sql
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");

// Lịch làm việc
const LichLamViec = sequelize.define("LichLamViec", {
  maLichLV: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  maNS: {
    type: DataTypes.STRING,
    allowNull: false     // Nhân sự y tế (bác sĩ)
  },
  maCa: {
    type: DataTypes.STRING,
    allowNull: false     // Ca làm việc
  },
  ngayLamViec: {
    type: DataTypes.DATE,
    allowNull: false     // Ngày làm việc
  }
}, {
  tableName: "LichLamViec",
  timestamps: false
});

module.exports = { LichLamViec };
