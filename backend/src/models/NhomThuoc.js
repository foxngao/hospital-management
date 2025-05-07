module.exports = (sequelize, DataTypes) => {
  const NhomThuoc = sequelize.define("NhomThuoc", {
    maNhom: {
        type: DataTypes.STRING(100),
        primaryKey: true,
    },
    tenNhom: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    moTa: {
        type: DataTypes.TEXT,
    },
}, {
    tableName: 'NhomThuoc',
    timestamps: false,
});

  NhomThuoc.associate = (models) => {
    // No associations
  };

  return NhomThuoc;
};