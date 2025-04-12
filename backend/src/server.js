const app = require('./app');
const sequelize = require('./config/database');
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.Console(),
    ],
});

async function startServer() {
    try {
        // Kết nối đến database
        await sequelize.authenticate();
        logger.info('Kết nối database thành công');

        // Đồng bộ hóa các model với database
        await sequelize.sync({ force: false }); // Sử dụng force: false để không xóa dữ liệu cũ (dùng force: true chỉ khi cần tạo lại bảng)
        logger.info('Đồng bộ hóa model với database thành công');

        // Khởi chạy server
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
            logger.info('Server đang chạy trên port ' + PORT);
        });
    } catch (error) {
        logger.error('Lỗi khi khởi động server: ' + error.message);
        process.exit(1); // Thoát nếu có lỗi nghiêm trọng
    }
}

startServer();