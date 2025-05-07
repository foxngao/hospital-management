const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database"); // Import sequelize instance

const TinTuc = sequelize.define("TinTuc", {
  maTin: { type: DataTypes.STRING, primaryKey: true },
  tieuDe: { type: DataTypes.STRING, allowNull: false },
  noiDung: { type: DataTypes.TEXT },
  ngayDang: { type: DataTypes.DATE, allowNull: false },
  maNS: { type: DataTypes.STRING, allowNull: false },
}, {
  tableName: "TinTuc",
  timestamps: false,
});

module.exports = TinTuc;
