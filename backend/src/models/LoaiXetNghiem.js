module.exports = (sequelize, DataTypes) => {
  const LoaiXetNghiem = sequelize.define("LoaiXetNghiem", {
    maLoaiXN: {
        type: DataTypes.STRING(100),
        primaryKey: true,
    },
    tenLoai: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    moTa: {
        type: DataTypes.TEXT,
    },
}, {
    tableName: 'LoaiXetNghiem',
    timestamps: false,
});

  LoaiXetNghiem.associate = (models) => {
    // No associations
  };

  return LoaiXetNghiem;
};