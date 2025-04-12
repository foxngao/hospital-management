const Appointment = require('./model');

exports.createAppointment = async (req, res) => {
    try {
        const { maBN, maBS, maCa, ngayHen } = req.body;
        const newAppointment = await Appointment.create({ maLH: generateAppointmentId(), maBN, maBS, maCa, ngayHen });
        res.status(201).json({ message: 'Tạo lịch hẹn thành công', appointment: newAppointment });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo lịch hẹn: ' + error.message });
    }
};

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