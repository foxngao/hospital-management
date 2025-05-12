const app = require("./app");
const db = require("./models");

const PORT = process.env.PORT || 4000;

// Đồng bộ models với CSDL
db.sequelize.authenticate()
  .then(() => {
    console.log("✅ Kết nối CSDL thành công.");
    app.listen(PORT, () => {
      console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Lỗi kết nối Sequelize:", err);
  });

