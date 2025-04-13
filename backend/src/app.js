const express = require('express');
const winston = require('winston');
const { authenticate } = require('./middleware/auth');
const authRoutes = require('./modules/auth/routes');
const userRoutes = require('./modules/user/routes');
const appointmentRoutes = require('./modules/appointment/routes');
const medicalRecordRoutes = require('./modules/medicalRecord/routes');
const pharmacyRoutes = require('./modules/pharmacy/routes');
const labTestRoutes = require('./modules/LabTest/routes');
const billingRoutes = require('./modules/billing/routes');
const notificationRoutes = require('./modules/Notification/routes');

const app = express();

// Middleware chung
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Logging middleware (gọi trước khi xử lý route)
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.Console(),
    ],
});

app.use((req, res, next) => {
    logger.info(`[${req.method}] ${req.url} - Body: ${JSON.stringify(req.body)}`);
    next();
});

// Áp dụng authentication cho các route cần bảo mật (trừ auth)
app.use('/api/users', authenticate);
app.use('/api/appointments', authenticate);
app.use('/api/medical-records', authenticate);
app.use('/api/pharmacy', authenticate);
app.use('/api/lab-tests', authenticate);
app.use('/api/billing', authenticate);
app.use('/api/notifications', authenticate);

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/medical-records', medicalRecordRoutes);
app.use('/api/pharmacy', pharmacyRoutes);
app.use('/api/lab-tests', labTestRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/notifications', notificationRoutes);

// Route mặc định cho root
app.get('/', (req, res) => {
    res.json({ message: 'API Hệ thống quản lý bệnh viện - Đang hoạt động' });
});

// Xử lý lỗi chung
app.use((err, req, res, next) => {
    logger.error('Lỗi server: ' + err.message);
    res.status(500).json({ message: 'Lỗi server: ' + err.message });
});

module.exports = app;