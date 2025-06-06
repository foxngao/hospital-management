package com.example.frontendapp.ui.xetnghiem

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController
import com.example.frontendapp.viewmodel.XetNghiemViewModel
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.time.temporal.ChronoUnit

@Composable
fun XetNghiemDetailScreen(
    navController: NavController,
    maPhieuXN: String,
    viewModel: XetNghiemViewModel = viewModel()
) {
    val listPhieu = viewModel.phieuList.value
    val phieu = listPhieu.find { it.maPhieuXN == maPhieuXN }

    if (phieu == null) {
        Text("❌ Không tìm thấy phiếu xét nghiệm")
        return
    }

    Column(modifier = Modifier.padding(16.dp)) {
        Text("📄Phiếu Xét Nghiệm", style = MaterialTheme.typography.headlineSmall)
        Spacer(modifier = Modifier.height(16.dp))

        InfoRow("🆔 Mã phiếu:", phieu.maPhieuXN ?: "-")
        InfoRow("🧬 Tên xét nghiệm:", phieu.xetNghiem?.tenXN ?: "-")
        InfoRow("📅 Ngày thực hiện:", phieu.ngayThucHien ?: "-")
        InfoRow("⏰ Giờ thực hiện:", phieu.gioThucHien ?: "-")
        InfoRow("📌 Ghi chú:", phieu.ghiChu ?: "-")

        if (!phieu.ketQua.isNullOrBlank()) {
            Spacer(modifier = Modifier.height(12.dp))
            Text("📊 Kết quả:", style = MaterialTheme.typography.titleMedium)
            Text(phieu.ketQua ?: "Không có")
        } else {
            Text("⚠️ Chưa có kết quả", color = MaterialTheme.colorScheme.error)
        }

        Spacer(modifier = Modifier.height(24.dp))
        Button(onClick = { navController.popBackStack() }) {
            Text("🔙 Quay lại")
        }
    }
}

@Composable
fun InfoRow(label: String, value: String) {
    Row(modifier = Modifier.fillMaxWidth().padding(vertical = 4.dp)) {
        Text(label, modifier = Modifier.weight(1f))
        Text(value, modifier = Modifier.weight(2f))
    }
}
