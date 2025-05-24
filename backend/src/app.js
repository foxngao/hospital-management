const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const errorHandler = require("./utils/errorHandler");

// Tải biến môi trường từ file .env
dotenv.config();

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:4001"],
  credentials: true
}));


// Cấu hình cho phép nhận dữ liệu JSON và form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import tất cả route từ các module (gom lại)
const tatCaTuyen = require("./routes");
app.use("/api", tatCaTuyen); // Tất cả các API sẽ đi qua /api

// Middleware xử lý lỗi chung toàn hệ thống
app.use(errorHandler);

// Xuất ứng dụng để file server.js dùng
module.exports = app;
