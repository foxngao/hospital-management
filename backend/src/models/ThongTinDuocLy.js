module.exports = (sequelize, DataTypes) => {
  const ThongTinDuocLy = sequelize.define("ThongTinDuocLy", {
      maTTDL: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      maThuoc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tacDungChinh: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      chiDinh: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      chongChiDinh: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lieuDung: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cachDung: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      tableName: "ThongTinDuocLy",
      timestamps: false,
    }
  );


  ThongTinDuocLy.associate = (models) => {
    ThongTinDuocLy.belongsTo(models.Thuoc, {foreignKey: "maThuoc",as: "Thuoc",});
  };

  return ThongTinDuocLy;
};