module.exports = (sequelize, DataTypes) => {
  const NhomQuyen = sequelize.define("NhomQuyen", {
    maNhom: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    tenNhom: DataTypes.STRING,
    moTa: DataTypes.TEXT,
  }, { tableName: "NhomQuyen", timestamps: false });

  NhomQuyen.associate = (models) => {
    NhomQuyen.hasMany(models.TaiKhoan, { foreignKey: "maNhom" });
  };

  return NhomQuyen;
};