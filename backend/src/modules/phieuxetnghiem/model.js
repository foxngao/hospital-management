const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const PhieuXetNghiem = sequelize.define("PhieuXetNghiem", {
    maPhieuXN: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    maYeuCau: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maXN: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maNS: {
      type: DataTypes.STRING,
    },
    maHSBA: {
      type: DataTypes.STRING,
    },
    ngayThucHien: {
      type: DataTypes.DATE,
    },
    ketQua: {
      type: DataTypes.TEXT,
    },
    ghiChu: {
      type: DataTypes.TEXT,
    }
  }, {
    tableName: "PhieuXetNghiem",
    timestamps: false,
  });

  PhieuXetNghiem.associate = (models) => {
    PhieuXetNghiem.belongsTo(models.YeuCauXetNghiem, { foreignKey: "maYeuCau" });
    PhieuXetNghiem.belongsTo(models.XetNghiem, { foreignKey: "maXN" });
    PhieuXetNghiem.belongsTo(models.NhanSuYTe, { foreignKey: "maNS" });
    PhieuXetNghiem.belongsTo(models.HoSoBenhAn, { foreignKey: "maHSBA" });
  };

  return PhieuXetNghiem;
};
