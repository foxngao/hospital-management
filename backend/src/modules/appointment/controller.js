const Appointment = require('./model');

exports.createAppointment = [
    ...require('../../middleware/validation').validateAppointment,
    async (req, res) => {
        try {
            const { maBN, maBS, maCa, ngayHen } = req.body;

            // Kiểm tra quyền: chỉ bệnh nhân hoặc bác sĩ được đặt
            if (req.user.maNhom !== 'BENHNHAN' && req.user.maNhom !== 'BACSI') {
                return res.status(403).json({ message: 'Chỉ bệnh nhân và bác sĩ được đặt lịch hẹn' });
            }

            const newAppointment = await Appointment.create({ maLH: generateAppointmentId(), maBN, maBS, maCa, ngayHen, trangThai: 'ChoXacNhan' });
            res.status(201).json({ message: 'Tạo lịch hẹn thành công', appointment: newAppointment });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi tạo lịch hẹn: ' + error.message });
        }
    },
];

exports.getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.findAll();
        res.json({ message: 'Lấy danh sách lịch hẹn thành công', appointments });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy lịch hẹn: ' + error.message });
    }
};

function generateAppointmentId() {
    return 'LH' + Date.now();
}