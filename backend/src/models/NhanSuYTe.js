module.exports = (sequelize, DataTypes) => {
  const NhanSuYTe = sequelize.define("NhanSuYTe", {
    maNS: { type: DataTypes.STRING, primaryKey: true },
    hoTen: DataTypes.STRING,
    chucVu: DataTypes.STRING,
    sdt: DataTypes.STRING,
    email: DataTypes.STRING,
    diaChi: DataTypes.STRING,
    maKhoa: DataTypes.STRING,
    maTK: DataTypes.STRING,
  }, { tableName: "NhanSuYTe", timestamps: false });

  NhanSuYTe.associate = (models) => {
    NhanSuYTe.belongsTo(models.TaiKhoan, { foreignKey: "maTK" });
  };

  return NhanSuYTe;
};