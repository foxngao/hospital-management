const Appointment = require('./model');
const BenhNhan = require('../../models/BenhNhan');
const BacSi = require('../../models/BacSi'); // Thêm dòng import này
const { validateAppointment } = require('../../middleware/validation');

exports.createAppointment = [
    validateAppointment,
    async (req, res) => {
        try {
            let { maBN, maBS, maCa, ngayHen } = req.body;
            
            // Chuẩn hóa mã BN (bỏ dấu <> nếu có)
            maBN = maBN.replace(/[<>]/g, '');

            // Kiểm tra quyền
            if (req.user.maNhom !== 'BENHNHAN' && req.user.maNhom !== 'BACSI') {
                return res.status(403).json({ message: 'Chỉ bệnh nhân và bác sĩ được đặt lịch hẹn' });
            }

            // Kiểm tra bệnh nhân
            const patient = await BenhNhan.findOne({ where: { maBN } });
            if (!patient) {
                return res.status(400).json({ 
                    message: 'Mã bệnh nhân không tồn tại',
                    suggestion: `Hãy kiểm tra lại mã BN hoặc tạo mới bệnh nhân với mã ${maBN}`
                });
            }

            // Kiểm tra bác sĩ (nếu có)
            if (maBS) {
                maBS = maBS.replace(/[<>]/g, '');
                const doctor = await BacSi.findOne({ where: { maBS } });
                if (!doctor) {
                    return res.status(400).json({ message: 'Mã bác sĩ không tồn tại' });
                }
            }

            // Tạo lịch hẹn
            const newAppointment = await Appointment.create({
                maLH: generateAppointmentId(),
                maBN,
                maBS: maBS || null,
                maCa,
                ngayHen,
                trangThai: 'ChoXacNhan'
            });

            res.status(201).json({
                message: 'Tạo lịch hẹn thành công',
                appointment: newAppointment
            });
        } catch (error) {
            res.status(500).json({ 
                message: 'Lỗi khi tạo lịch hẹn',
                error: error.message 
            });
        }
    }
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
    validateAppointment, // Bỏ ... vì validateAppointment đã là mảng
    async (req, res) => {
        try {
            const { maLH } = req.params;
            const { maBN, maBS, maCa, ngayHen, trangThai } = req.body;

            // Kiểm tra quyền: chỉ bác sĩ được sửa
            if (req.user.maNhom !== 'BACSI') {
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

            // Kiểm tra quyền: chỉ bác sĩ được xóa
            if (req.user.maNhom !== 'BACSI') {
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