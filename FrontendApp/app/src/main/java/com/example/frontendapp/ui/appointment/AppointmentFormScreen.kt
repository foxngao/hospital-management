package com.example.frontendapp.ui.appointment

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
import com.example.frontendapp.data.model.Appointment
import com.example.frontendapp.data.remote.RetrofitApp
import com.example.frontendapp.viewmodel.AppointmentViewModel
import com.example.frontendapp.viewmodel.BacSiViewModel
import com.example.frontendapp.viewmodel.KhoaViewModel
import com.example.frontendapp.viewmodel.PatientViewModel
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.util.*

@Composable
fun AppointmentFormScreen(
    navController: NavController,
    appointmentViewModel: AppointmentViewModel = viewModel(),
    patientViewModel: PatientViewModel = viewModel(),
    khoaViewModel: KhoaViewModel = viewModel(),
    bacSiViewModel: BacSiViewModel = viewModel()
) {
    val context = LocalContext.current
    val calendar = Calendar.getInstance()
    if (calendar.get(Calendar.HOUR_OF_DAY) >= 17) {
        calendar.add(Calendar.DAY_OF_MONTH, 1)
    }
    val dateFormat = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault())
    val today = dateFormat.format(calendar.time)

    var ngayHen by remember { mutableStateOf(today) }
    var gioHen by remember { mutableStateOf("") }
    var ghiChu by remember { mutableStateOf("") }
    var selectedKhoa by remember { mutableStateOf("") }
    var selectedBacSi by remember { mutableStateOf("") }
    var bacSiDisplayList by remember { mutableStateOf(listOf<String>()) }

    val message by appointmentViewModel.message
    val khoaList by khoaViewModel.khoaList.collectAsState()
    val patient = patientViewModel.patient.value
    val maBN = patient?.maBN ?: ""
    val hoTen = patient?.hoTen ?: ""
    val ngaySinh = patient?.ngaySinh ?: ""
    val gioiTinh = patient?.gioiTinh ?: ""

    val currentHour = Calendar.getInstance().get(Calendar.HOUR_OF_DAY)
    val currentMinute = Calendar.getInstance().get(Calendar.MINUTE)

    val khungGio = (7..17).flatMap { listOf("$it:00", "$it:30") }
    val gioHopLe = remember(ngayHen) {
        val ngayHomNay = dateFormat.format(Date())
        if (ngayHen == ngayHomNay) {
            khungGio.filter { time ->
                val parts = time.split(":")
                val h = parts[0].toInt()
                val m = parts[1].toInt()
                h > currentHour || (h == currentHour && m > currentMinute)
            }
        } else khungGio
    }

    val scope = rememberCoroutineScope()

    val datePickerDialog = DatePickerDialog(
        context,
        { _: DatePicker, year: Int, month: Int, day: Int ->
            calendar.set(year, month, day)
            ngayHen = dateFormat.format(calendar.time)
        },
        calendar.get(Calendar.YEAR),
        calendar.get(Calendar.MONTH),
        calendar.get(Calendar.DAY_OF_MONTH)
    )

    LaunchedEffect(Unit) {
        khoaViewModel.loadKhoaList()
        patientViewModel.loadCurrentPatient()
    }

    LaunchedEffect(selectedKhoa) {
        if (selectedKhoa.isNotEmpty()) {
            scope.launch {
                try {
                    val res = RetrofitApp.bacSiApi.getAll()
                    if (res.isSuccessful) {
                        val list = res.body()?.data ?: emptyList()
                        val selectedMaKhoa = khoaList.find { it.tenKhoa == selectedKhoa }?.maKhoa
                        bacSiDisplayList = list
                            .filter { it.maKhoa == selectedMaKhoa }
                            .map { "${it.maBS} - ${it.hoTen}" }
                    } else {
                        bacSiDisplayList = emptyList()
                    }
                } catch (_: Exception) {
                    bacSiDisplayList = emptyList()
                }
            }
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
            .background(Color(0xFFE3F2FD)) // Xanh dương pastel nhạt
    ) {
        Text(
            "🗓️ Đặt lịch hẹn khám",
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
                    "Mã BN: $maBN",
                    color = Color(0xFF0D3B66),
                    fontSize = 14.sp
                )
                Text(
                    "Họ tên: $hoTen",
                    color = Color(0xFF0D3B66),
                    fontSize = 14.sp
                )
                Text(
                    "Ngày sinh: $ngaySinh",
                    color = Color(0xFF0D3B66),
                    fontSize = 14.sp
                )
                Text(
                    "Giới tính: $gioiTinh",
                    color = Color(0xFF0D3B66),
                    fontSize = 14.sp
                )

                Spacer(modifier = Modifier.height(16.dp))

                OutlinedTextField(
                    value = ngayHen,
                    onValueChange = {},
                    modifier = Modifier
                        .fillMaxWidth()
                        .clickable { datePickerDialog.show() },
                    label = { Text("Ngày hẹn", color = Color(0xFF455A64)) },
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
                    label = "Chọn giờ hẹn",
                    options = gioHopLe,
                    selectedOption = gioHen,
                    onOptionSelected = { gioHen = it }
                )

                OutlinedTextField(
                    value = ghiChu,
                    onValueChange = { ghiChu = it },
                    modifier = Modifier.fillMaxWidth(),
                    label = { Text("Ghi chú", color = Color(0xFF455A64)) },
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedBorderColor = Color(0xFF4CAF50),
                        unfocusedBorderColor = Color(0xFFB0BEC5),
                        focusedTextColor = Color(0xFF0D3B66),
                        unfocusedTextColor = Color(0xFF0D3B66)
                    ),
                    shape = RoundedCornerShape(8.dp)
                )

                DropdownMenuBox(
                    label = "Chọn khoa khám",
                    options = khoaList.map { it.tenKhoa },
                    selectedOption = selectedKhoa,
                    onOptionSelected = { selectedKhoa = it }
                )

                DropdownMenuBox(
                    label = "Chọn bác sĩ",
                    options = bacSiDisplayList,
                    selectedOption = selectedBacSi,
                    onOptionSelected = { selectedBacSi = it }
                )

                Spacer(modifier = Modifier.height(16.dp))

                Button(
                    onClick = {
                        val maBS = selectedBacSi.split(" - ").firstOrNull() ?: ""
                        appointmentViewModel.createAppointment(
                            Appointment(
                                maBN = maBN,
                                maBS = maBS,
                                ngayKham = ngayHen,
                                gioKham = gioHen,
                                ghiChu = ghiChu,
                                tenKhoa = selectedKhoa
                            )
                        ) {
                            patientViewModel.patient.value?.maBN?.let {
                                appointmentViewModel.getAppointmentsByMaBN(it)
                            }
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

                Spacer(modifier = Modifier.height(16.dp))
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