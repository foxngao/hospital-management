// modules/feedback/model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const PhanHoi = sequelize.define("PhanHoi", {
  maPH: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  maBN: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  noiDung: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  ngayGui: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  trangThai: {
    type: DataTypes.STRING,
  },
}, {
  tableName: "PhanHoi",
  timestamps: false,
});

module.exports = PhanHoi;
