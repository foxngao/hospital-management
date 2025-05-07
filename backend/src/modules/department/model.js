// modules/department/model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database"); 

module.exports = (sequelize, DataTypes) => {
  const KhoaPhong = sequelize.define("KhoaPhong", {
    maKhoa: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    tenKhoa: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    moTa: {
      type: DataTypes.TEXT,
    },
  }, {
    tableName: "KhoaPhong",
    timestamps: false,
  });

  KhoaPhong.associate = (models) => {
    // KhoaPhong.hasMany(models.BacSi, { foreignKey: "maKhoa" });
  };

  return KhoaPhong;
};


module.exports = KhoaPhong;
