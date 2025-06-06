package com.example.frontendapp.ui.components

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.example.frontendapp.data.model.PhieuKham

@Composable
fun PhieuKhamDetailScreen(phieuKham: PhieuKham) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 6.dp),
        shape = MaterialTheme.shapes.medium,
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(modifier = Modifier.padding(12.dp)) {
            Text("📄 Mã phiếu khám: ${phieuKham.maPK}", style = MaterialTheme.typography.bodyLarge)
            Text("📅 Ngày khám: ${phieuKham.ngayKham}", style = MaterialTheme.typography.bodyMedium)
            Text("🩺 Triệu chứng: ${phieuKham.trieuChung ?: "-"}", style = MaterialTheme.typography.bodyMedium)
            Text("🔍 Chẩn đoán: ${phieuKham.chuanDoan ?: "-"}", style = MaterialTheme.typography.bodyMedium)
            Text("📋 Lời dặn: ${phieuKham.loiDan ?: "-"}", style = MaterialTheme.typography.bodyMedium)
            Text("⚙️ Trạng thái: ${phieuKham.trangThai ?: "-"}", style = MaterialTheme.typography.bodyMedium)
        }
    }
}
