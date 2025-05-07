module.exports = (sequelize, DataTypes) => {
  const ChiTietGioHang = sequelize.define("ChiTietGioHang", {
    maCTGH: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    maGH: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maThuoc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    soLuong: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: "ChiTietGioHang",
    timestamps: false,
  });

  ChiTietGioHang.associate = (models) => {
    ChiTietGioHang.belongsTo(models.GioHang, { foreignKey: "maGH" });
    ChiTietGioHang.belongsTo(models.Thuoc, { foreignKey: "maThuoc" });

    // Optional:
    // models.GioHang.hasMany(ChiTietGioHang, { foreignKey: "maGH" });
    // models.Thuoc.hasMany(ChiTietGioHang, { foreignKey: "maThuoc" });
  };

  return ChiTietGioHang;
};
