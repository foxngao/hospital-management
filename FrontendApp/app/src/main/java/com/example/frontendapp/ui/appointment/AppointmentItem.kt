package com.example.frontendapp.ui.appointment

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Create
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.frontendapp.data.model.Appointment

@Composable
fun AppointmentItem(
    appointment: Appointment,
    onDelete: (String) -> Unit,
    onEdit: (Appointment) -> Unit
) {
    Card(
        modifier = Modifier
            .padding(8.dp)
            .fillMaxWidth()
            .clip(RoundedCornerShape(12.dp))
            .shadow(2.dp),
        colors = CardDefaults.cardColors(containerColor = Color(0xFFF9FAFB)), // Xám pastel rất nhạt
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(
            modifier = Modifier.padding(12.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(
                    imageVector = Icons.Default.Create,
                    contentDescription = "Mã lịch",
                    modifier = Modifier.size(16.dp),
                    tint = Color(0xFF0D3B66)
                )
                Spacer(modifier = Modifier.width(4.dp))
                Text(
                    "🆔 Mã lịch: ${appointment.maLich}",
                    color = Color(0xFF0D3B66),
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Medium
                )
            }
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(
                    imageVector = Icons.Default.Create,
                    contentDescription = "Mã BN",
                    modifier = Modifier.size(16.dp),
                    tint = Color(0xFF0D3B66)
                )
                Spacer(modifier = Modifier.width(4.dp))
                Text(
                    "👤 Mã BN: ${appointment.maBN}",
                    color = Color(0xFF0D3B66),
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Medium
                )
            }
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(
                    imageVector = Icons.Default.Create,
                    contentDescription = "Khoa khám",
                    modifier = Modifier.size(16.dp),
                    tint = Color(0xFF0D3B66)
                )
                Spacer(modifier = Modifier.width(4.dp))
                Text(
                    "🏥 Khoa khám: ${appointment.tenKhoa ?: "null"}",
                    color = Color(0xFF0D3B66),
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Medium
                )
            }
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(
                    imageVector = Icons.Default.Create,
                    contentDescription = "Mã bác sĩ",
                    modifier = Modifier.size(16.dp),
                    tint = Color(0xFF0D3B66)
                )
                Spacer(modifier = Modifier.width(4.dp))
                Text(
                    "🧑‍⚕️ Mã bác sĩ: ${appointment.maBS ?: "Không rõ"}",
                    color = Color(0xFF0D3B66),
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Medium
                )
            }
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(
                    imageVector = Icons.Default.Create,
                    contentDescription = "Ngày khám",
                    modifier = Modifier.size(16.dp),
                    tint = Color(0xFF0D3B66)
                )
                Spacer(modifier = Modifier.width(4.dp))
                Text(
                    "📅 Ngày khám: ${appointment.ngayKham}",
                    color = Color(0xFF0D3B66),
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Medium
                )
            }
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(
                    imageVector = Icons.Default.Create,
                    contentDescription = "Giờ khám",
                    modifier = Modifier.size(16.dp),
                    tint = Color(0xFF0D3B66)
                )
                Spacer(modifier = Modifier.width(4.dp))
                Text(
                    "⏰ Giờ khám: ${appointment.gioKham}",
                    color = Color(0xFF0D3B66),
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Medium
                )
            }
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(
                    imageVector = Icons.Default.Create,
                    contentDescription = "Ghi chú",
                    modifier = Modifier.size(16.dp),
                    tint = Color(0xFF0D3B66)
                )
                Spacer(modifier = Modifier.width(4.dp))
                Text(
                    "📝 Ghi chú: ${appointment.ghiChu}",
                    color = Color(0xFF0D3B66),
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Medium
                )
            }

            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(top = 8.dp),
                horizontalArrangement = Arrangement.SpaceEvenly
            ) {
                Button(
                    onClick = { onEdit(appointment) },
                    modifier = Modifier
                        .weight(1f)
                        .height(40.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFC8E6C9)), // Xanh lá pastel
                    shape = RoundedCornerShape(8.dp)
                ) {
                    Icon(
                        imageVector = Icons.Default.Create,
                        contentDescription = "Sửa",
                        modifier = Modifier.size(16.dp),
                        tint = Color(0xFF2F855A)
                    )
                    Spacer(modifier = Modifier.width(4.dp))
                    Text(
                        "✏️ Sửa",
                        color = Color(0xFF2F855A),
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Medium
                    )
                }
                Spacer(modifier = Modifier.width(8.dp))
                Button(
                    onClick = { appointment.maLich?.let(onDelete) },
                    modifier = Modifier
                        .weight(1f)
                        .height(40.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFEFE0E0)), // Đỏ pastel nhạt
                    shape = RoundedCornerShape(8.dp)
                ) {
                    Icon(
                        imageVector = Icons.Default.Delete,
                        contentDescription = "Huỷ",
                        modifier = Modifier.size(16.dp),
                        tint = Color(0xFFD32F2F)
                    )
                    Spacer(modifier = Modifier.width(4.dp))
                    Text(
                        "❌ Huỷ",
                        color = Color(0xFFD32F2F),
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Medium
                    )
                }
            }
        }
    }
}