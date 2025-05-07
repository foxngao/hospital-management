const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database"); // Import sequelize instance

const ThongTinDuocLy = sequelize.define("ThongTinDuocLy", {
  maTTDL: { type: DataTypes.STRING, primaryKey: true },
  maThuoc: { type: DataTypes.STRING, allowNull: false },
  tacDungChinh: { type: DataTypes.TEXT, allowNull: false },
  chiDinh: { type: DataTypes.TEXT },
  chongChiDinh: { type: DataTypes.TEXT },
  tacDungPhu: { type: DataTypes.TEXT },
  tuongTacThuoc: { type: DataTypes.TEXT },
  canhBao: { type: DataTypes.TEXT },
  doiTuongSuDung: { type: DataTypes.TEXT },
  cachDung: { type: DataTypes.TEXT },
  baoQuan: { type: DataTypes.TEXT },
}, {
  tableName: "ThongTinDuocLy",
  timestamps: false,
});

module.exports = ThongTinDuocLy;
