module.exports = (sequelize, DataTypes) => {
  const BenhNhan = sequelize.define("BenhNhan", {
    maBN: { type: DataTypes.STRING, primaryKey: true },
    hoTen: DataTypes.STRING,
    gioiTinh: DataTypes.STRING,
    ngaySinh: DataTypes.DATE,
    sdt: DataTypes.STRING,
    email: DataTypes.STRING,
    diaChi: DataTypes.STRING,
    maTK: DataTypes.STRING,
  }, { tableName: "BenhNhan", timestamps: false });

  BenhNhan.associate = (models) => {
    BenhNhan.belongsTo(models.TaiKhoan, { foreignKey: "maTK" });
  };

  return BenhNhan;
};
