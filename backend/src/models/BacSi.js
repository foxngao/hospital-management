module.exports = (sequelize, DataTypes) => {
  const BacSi = sequelize.define("BacSi", {
    maBS: {
      type: DataTypes.STRING(100),
      primaryKey: true,
    },
    maTK: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    maKhoa: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    hoTen: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    chuyenMon: DataTypes.STRING(100),
    chucVu: DataTypes.STRING(100),
    trinhDo: DataTypes.STRING(50),
  }, {
    tableName: 'BacSi',
    timestamps: false,
  });

  BacSi.associate = (models) => {
    BacSi.belongsTo(models.TaiKhoan, { foreignKey: 'maTK' });
    models.TaiKhoan.hasOne(BacSi, { foreignKey: 'maTK' });

    BacSi.belongsTo(models.KhoaPhong, { foreignKey: 'maKhoa' });
    models.KhoaPhong.hasMany(BacSi, { foreignKey: 'maKhoa' });
  };

  return BacSi;
};
