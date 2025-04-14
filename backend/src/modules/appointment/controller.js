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

exports.updateAppointment = [
    ...require('../../middleware/validation').validateAppointment,
    async (req, res) => {
        try {
            const { maLH } = req.params;
            const { maBN, maBS, maCa, ngayHen, trangThai } = req.body;

            // Kiểm tra quyền: chỉ bác sĩ được sửa
            if ( req.user.maNhom !== 'BACSI') {
                return res.status(403).json({ message: 'Chỉ bác sĩ được sửa lịch hẹn' });
            }

            const appointment = await Appointment.findByPk(maLH);
            if (!appointment) {
                return res.status(404).json({ message: 'Lịch hẹn không tồn tại' });
            }

            await appointment.update({ maBN, maBS, maCa, ngayHen, trangThai });
            res.json({ message: 'Cập nhật lịch hẹn thành công', appointment });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi cập nhật lịch hẹn: ' + error.message });
        }
    },
];

exports.deleteAppointment = [
    async (req, res) => {
        try {
            const { maLH } = req.params;

            // Kiểm tra quyền: chỉ  bác sĩ được xóa
            if ( req.user.maNhom !== 'BACSI') {
                return res.status(403).json({ message: 'Chỉ bác sĩ được xóa lịch hẹn' });
            }

            const appointment = await Appointment.findByPk(maLH);
            if (!appointment) {
                return res.status(404).json({ message: 'Lịch hẹn không tồn tại' });
            }

            await appointment.destroy();
            res.json({ message: 'Xóa lịch hẹn thành công' });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi xóa lịch hẹn: ' + error.message });
        }
    },
];

function generateAppointmentId() {
    return 'LH' + Date.now();
}