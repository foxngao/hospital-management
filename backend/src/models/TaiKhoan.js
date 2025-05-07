module.exports = (sequelize, DataTypes) => {
  const TaiKhoan = sequelize.define("TaiKhoan", {
    maTK: { type: DataTypes.STRING, primaryKey: true },
    tenDangNhap: DataTypes.STRING,
    matKhau: DataTypes.STRING,
    email: DataTypes.STRING,
    trangThai: DataTypes.BOOLEAN,
    maNhom: DataTypes.STRING,
  }, { tableName: "TaiKhoan", timestamps: false });

  TaiKhoan.associate = (models) => {
    TaiKhoan.belongsTo(models.NhomQuyen, { foreignKey: "maNhom" });
    TaiKhoan.hasOne(models.NhanSuYTe, { foreignKey: "maTK" });
    TaiKhoan.hasOne(models.BenhNhan, { foreignKey: "maTK" });
  };

  return TaiKhoan;
};