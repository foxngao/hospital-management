package com.example.frontendapp.ui.components

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.example.frontendapp.data.model.DonThuoc

@Composable
fun DonThuocDetailScreen(donThuoc: DonThuoc) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 6.dp),
        shape = MaterialTheme.shapes.medium,
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(modifier = Modifier.padding(12.dp)) {
            Text("🧾 Mã đơn thuốc: ${donThuoc.maDT}", style = MaterialTheme.typography.bodyLarge)
            Text("📅 Ngày kê đơn: ${donThuoc.ngayKeDon}", style = MaterialTheme.typography.bodyMedium)
            Text("💊 Mã thuốc: ${donThuoc.maThuoc ?: "-"}", style = MaterialTheme.typography.bodyMedium)
            Text("👨‍⚕️ Bác sĩ: ${donThuoc.maBS}", style = MaterialTheme.typography.bodyMedium)
        }
    }
}
