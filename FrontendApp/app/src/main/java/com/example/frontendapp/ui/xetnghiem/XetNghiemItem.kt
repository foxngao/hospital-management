package com.example.frontendapp.ui.xetnghiem

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.example.frontendapp.data.model.test.PhieuXetNghiem

@Composable
fun XetNghiemItem(
    phieu: PhieuXetNghiem,
    onCancel: (String) -> Unit
) {
    Card(
        modifier = Modifier
            .padding(8.dp)
            .fillMaxWidth()
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text("🧪 Mã phiếu: ${phieu.maPhieuXN ?: "(Không có mã)"}", style = MaterialTheme.typography.titleMedium)
            Text("📑 Mã yêu cầu: ${phieu.maYeuCau ?: "(Không có)"}")
            Text("📅 Ngày thực hiện: ${phieu.ngayThucHien}")
            Text("🔬 Xét nghiệm: ${phieu.xetNghiem?.tenXN ?: "Không rõ"}")
            Text("📌 Ghi chú: ${phieu.ghiChu ?: "-"}")
            Text("📋 Trạng thái: ${phieu.yeuCauXetNghiem?.trangThai ?: "Chờ xác nhận"}")

            Spacer(modifier = Modifier.height(8.dp))

            if (phieu.yeuCauXetNghiem?.trangThai == null || phieu.yeuCauXetNghiem.trangThai == "CHO_THUC_HIEN") {
                Button(
                    onClick = { phieu.maPhieuXN?.let(onCancel) },
                    colors = ButtonDefaults.buttonColors(MaterialTheme.colorScheme.error)
                ) {
                    Text("❌ Huỷ lịch")
                }
            }
        }
    }
}
