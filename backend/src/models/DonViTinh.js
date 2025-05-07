module.exports = (sequelize, DataTypes) => {
  const DonViTinh = sequelize.define("DonViTinh", {
    maDVT: {
        type: DataTypes.STRING(100),
        primaryKey: true,
    },
    tenDVT: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    moTa: {
        type: DataTypes.STRING(100),
    },
}, {
    tableName: 'DonViTinh',
    timestamps: false,
});

  DonViTinh.associate = (models) => {
    // No associations
  };

  return DonViTinh;
};