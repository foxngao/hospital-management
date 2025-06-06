package com.example.frontendapp.ui.xetnghiem

import android.app.DatePickerDialog
import android.widget.DatePicker
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.DateRange
import androidx.compose.material.icons.filled.Check
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController
import com.example.frontendapp.data.model.test.PhieuXetNghiem
import com.example.frontendapp.viewmodel.PatientViewModel
import com.example.frontendapp.viewmodel.XetNghiemViewModel
import java.text.SimpleDateFormat
import java.util.*

@Composable
fun XetNghiemFormScreen(
    navController: NavController,
    xetNghiemViewModel: XetNghiemViewModel = viewModel(),
    patientViewModel: PatientViewModel = viewModel()
) {
    val context = LocalContext.current
    val calendar = Calendar.getInstance()
    val dateFormat = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault())
    val today = dateFormat.format(Date())

    var ngayThucHien by remember { mutableStateOf(today) }
    var gioHenXN by remember { mutableStateOf("") }
    var ghiChu by remember { mutableStateOf("") }
    var selectedLoaiXN by remember { mutableStateOf("Chọn loại xét nghiệm") }

    val khungGio = buildList {
        for (hour in 7..17) {
            add(String.format("%02d:00", hour))
            add(String.format("%02d:15", hour))
            add(String.format("%02d:30", hour))
            add(String.format("%02d:45", hour))
        }
    }

    val danhSachXN by xetNghiemViewModel.danhSachXN.collectAsState()
    val message by xetNghiemViewModel.message
    val patient = patientViewModel.patient.value
    val maHSBA = patient?.maBN ?: ""

    val datePickerDialog = DatePickerDialog(
        context,
        { _: DatePicker, year: Int, month: Int, day: Int ->
            calendar.set(year, month, day)
            ngayThucHien = dateFormat.format(calendar.time)
        },
        calendar.get(Calendar.YEAR),
        calendar.get(Calendar.MONTH),
        calendar.get(Calendar.DAY_OF_MONTH)
    )

    LaunchedEffect(Unit) {
        patientViewModel.loadCurrentPatient()
        xetNghiemViewModel.loadXetNghiem()
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
            .background(Color(0xFFE3F2FD)) // Xanh dương pastel nhạt
    ) {
        Text(
            "📄 Đặt lịch xét nghiệm",
            style = MaterialTheme.typography.headlineSmall,
            color = Color(0xFF0D3B66), // Xanh đậm
            fontWeight = FontWeight.Bold,
            modifier = Modifier.padding(bottom = 16.dp)
        )

        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 8.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White),
            elevation = CardDefaults.cardElevation(defaultElevation = 4.dp),
            shape = RoundedCornerShape(12.dp)
        ) {
            Column(
                modifier = Modifier.padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                Text(
                    "Mã BN: $maHSBA",
                    color = Color(0xFF0D3B66),
                    fontSize = 14.sp
                )

                Spacer(modifier = Modifier.height(16.dp))

                OutlinedTextField(
                    value = ngayThucHien,
                    onValueChange = {},
                    modifier = Modifier
                        .fillMaxWidth()
                        .clickable { datePickerDialog.show() },
                    label = { Text("Ngày xét nghiệm", color = Color(0xFF455A64)) },
                    readOnly = true,
                    enabled = false,
                    leadingIcon = {
                        Icon(
                            imageVector = Icons.Default.DateRange,
                            contentDescription = "Chọn ngày",
                            tint = Color(0xFF0D3B66)
                        )
                    },
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedBorderColor = Color(0xFF4CAF50), // Xanh lá pastel đậm
                        unfocusedBorderColor = Color(0xFFB0BEC5), // Xám nhạt
                        focusedTextColor = Color(0xFF0D3B66),
                        unfocusedTextColor = Color(0xFF0D3B66)
                    ),
                    shape = RoundedCornerShape(8.dp)
                )

                DropdownMenuBox(
                    label = "Giờ xét nghiệm",
                    options = khungGio,
                    selectedOption = gioHenXN,
                    onOptionSelected = { gioHenXN = it }
                )

                DropdownMenuBox(
                    label = "Chọn xét nghiệm",
                    options = listOf("Chọn loại xét nghiệm") + danhSachXN.map { it.tenXN },
                    selectedOption = selectedLoaiXN,
                    onOptionSelected = { selectedLoaiXN = it }
                )

                OutlinedTextField(
                    value = ghiChu,
                    onValueChange = { ghiChu = it },
                    modifier = Modifier.fillMaxWidth(),
                    label = { Text("Ghi chú (tuỳ chọn)", color = Color(0xFF455A64)) },
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedBorderColor = Color(0xFF4CAF50),
                        unfocusedBorderColor = Color(0xFFB0BEC5),
                        focusedTextColor = Color(0xFF0D3B66),
                        unfocusedTextColor = Color(0xFF0D3B66)
                    ),
                    shape = RoundedCornerShape(8.dp)
                )

                Spacer(modifier = Modifier.height(16.dp))

                Button(
                    onClick = {
                        if (selectedLoaiXN == "Chọn loại xét nghiệm") {
                            xetNghiemViewModel.setError("❌ Vui lòng chọn loại xét nghiệm")
                            return@Button
                        }

                        val selectedXN = danhSachXN.find { it.tenXN == selectedLoaiXN }
                        val maXN = selectedXN?.maXN

                        if (maXN.isNullOrBlank()) {
                            xetNghiemViewModel.setError("❌ Không tìm thấy mã xét nghiệm")
                            return@Button
                        }

                        val now = Calendar.getInstance()
                        val sdf = SimpleDateFormat("yyyy-MM-dd HH:mm", Locale.getDefault())
                        val selectedDateTime = sdf.parse("$ngayThucHien $gioHenXN")
                        if (selectedDateTime != null && selectedDateTime.before(now.time)) {
                            xetNghiemViewModel.setError("❌ Không thể đặt lịch đã qua thời gian hiện tại")
                            return@Button
                        }

                        val phieu = PhieuXetNghiem(
                            maPhieuXN = "XN${(1000..9999).random()}",
                            maYeuCau = null,
                            maXN = maXN,
                            maNS = null,
                            maHSBA = maHSBA,
                            ngayThucHien = ngayThucHien,
                            gioThucHien = gioHenXN,
                            ghiChu = ghiChu
                        )

                        xetNghiemViewModel.createLichXetNghiem(phieu) {
                            navController.popBackStack()
                        }
                    },
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(48.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFC8E6C9)), // Xanh lá pastel
                    shape = RoundedCornerShape(8.dp)
                ) {
                    Icon(
                        imageVector = Icons.Default.Check,
                        contentDescription = "Đặt lịch",
                        modifier = Modifier.size(20.dp),
                        tint = Color(0xFF2F855A)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        "✅ Đặt lịch",
                        color = Color(0xFF2F855A),
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Medium
                    )
                }

                Spacer(modifier = Modifier.height(12.dp))
                Text(
                    text = message,
                    color = Color(0xFFEF9A9A), // Đỏ pastel nhạt
                    style = MaterialTheme.typography.bodyMedium
                )
            }
        }
    }
}

@Composable
fun DropdownMenuBox(
    label: String,
    options: List<String>,
    selectedOption: String,
    onOptionSelected: (String) -> Unit
) {
    var expanded by remember { mutableStateOf(false) }

    Column(modifier = Modifier.fillMaxWidth()) {
        OutlinedTextField(
            value = selectedOption,
            onValueChange = {},
            label = { Text(label, color = Color(0xFF455A64)) },
            modifier = Modifier
                .fillMaxWidth()
                .clickable { expanded = true },
            readOnly = true,
            enabled = false,
            colors = OutlinedTextFieldDefaults.colors(
                focusedBorderColor = Color(0xFF4CAF50),
                unfocusedBorderColor = Color(0xFFB0BEC5),
                focusedTextColor = Color(0xFF0D3B66),
                unfocusedTextColor = Color(0xFF0D3B66)
            ),
            shape = RoundedCornerShape(8.dp)
        )
        DropdownMenu(
            expanded = expanded,
            onDismissRequest = { expanded = false },
            modifier = Modifier.background(Color.White)
        ) {
            options.forEach { option ->
                DropdownMenuItem(
                    onClick = {
                        onOptionSelected(option)
                        expanded = false
                    },
                    text = { Text(option, color = Color(0xFF0D3B66)) }
                )
            }
        }
    }
}