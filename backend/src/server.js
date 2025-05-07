const app = require("./app");
const db = require("./models");

const PORT = process.env.PORT || 4000;

// Đồng bộ models với CSDL
db.sequelize.sync({ alter: true })
  .then(() => {
    console.log(" Kết nối CSDL thành công và đồng bộ model.");
    app.listen(PORT, () => {
      console.log(` Server đang chạy tại http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" Lỗi kết nối Sequelize:", err);
  });
