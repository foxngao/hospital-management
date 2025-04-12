const Notification = require('./model');

exports.sendNotification = async (req, res) => {
    try {
        const { maNguoiNhan, noiDung } = req.body;
        const newNotification = await Notification.create({ maThongBao: generateNotificationId(), maNguoiNhan, noiDung });
        res.status(201).json({ message: 'Gửi thông báo thành công', notification: newNotification });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi gửi thông báo: ' + error.message });
    }
};

function generateNotificationId() {
    return 'TB' + Date.now();
}