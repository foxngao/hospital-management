module.exports = (sequelize, DataTypes) => {
  const Thuoc = sequelize.define("Thuoc", {
      maThuoc: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      tenThuoc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      maNhom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      donVi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gia: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      soLuong: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    }, {
      tableName: "Thuoc",
      timestamps: false,
    }
  );



  Thuoc.associate = (models) => {
    Thuoc.hasOne(models.ThongTinDuocLy, { foreignKey: "maThuoc", as: "ThongTinDuocLy",});
  };

  return Thuoc;
};