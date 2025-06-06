package com.example.frontendapp.ui.patient

import android.app.DatePickerDialog
import android.widget.DatePicker
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController
import androidx.navigation.compose.currentBackStackEntryAsState
import com.example.frontendapp.data.model.Patient
import com.example.frontendapp.data.remote.RetrofitApp
import com.example.frontendapp.viewmodel.PatientViewModel
import java.text.SimpleDateFormat
import java.util.*

@Composable
fun PatientRegisterScreen(
    navController: NavController,
    viewModel: PatientViewModel = viewModel()
) {
    var hoTen by remember { mutableStateOf("") }
    var ngaySinh by remember { mutableStateOf("") }
    var gioiTinh by remember { mutableStateOf("") }
    var soDienThoai by remember { mutableStateOf("") }
    var diaChi by remember { mutableStateOf("") }
    var bhyt by remember { mutableStateOf("") }
    val message by viewModel.message
    val context = LocalContext.current

    val calendar = Calendar.getInstance()
    val dateFormat = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault())

    val datePickerDialog = DatePickerDialog(
        context,
        { _: DatePicker, year: Int, month: Int, day: Int ->
            calendar.set(year, month, day)
            ngaySinh = dateFormat.format(calendar.time)
        },
        calendar.get(Calendar.YEAR),
        calendar.get(Calendar.MONTH),
        calendar.get(Calendar.DAY_OF_MONTH)
    )

    val maTK = RetrofitApp.currentUserId

    val navBackStackEntry = navController.currentBackStackEntryAsState()

    LaunchedEffect(navBackStackEntry.value) {
        maTK?.let { viewModel.getPatientById(it) }
    }

    // Pastel color palette
    val pastelBlue = Color(0xFFD6EAF8) // Soft blue for background
    val pastelGreen = Color(0xFFD4EFDF) // Soft green for primary button
    val pastelWhite = Color(0xFFF8FAFC) // Soft white for cards
    val darkText = Color(0xFF2D3748) // Dark gray for text contrast
    val accentText = Color(0xFF4A90E2) // Blue for secondary text

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(pastelBlue)
            .padding(16.dp)
    ) {
        // Header
        Text(
            "Cập nhật hồ sơ bệnh nhân",
            style = MaterialTheme.typography.h5.copy(
                fontWeight = FontWeight.Bold,
                color = darkText
            )
        )

        Spacer(modifier = Modifier.height(12.dp))

        // Account ID
        Card(
            modifier = Modifier.fillMaxWidth(),
            backgroundColor = pastelWhite,
            shape = RoundedCornerShape(12.dp),
            elevation = 4.dp
        ) {
            Column(
                modifier = Modifier.padding(16.dp)
            ) {
                if (maTK != null) {
                    Text(
                        "Mã tài khoản: $maTK",
                        style = MaterialTheme.typography.body1.copy(
                            color = darkText,
                            fontWeight = FontWeight.Medium
                        )
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Form Fields
        Card(
            modifier = Modifier.fillMaxWidth(),
            backgroundColor = pastelWhite,
            shape = RoundedCornerShape(12.dp),
            elevation = 4.dp
        ) {
            Column(
                modifier = Modifier.padding(16.dp)
            ) {
                OutlinedTextField(
                    value = hoTen,
                    onValueChange = { hoTen = it },
                    label = { Text("Họ tên", color = accentText) },
                    modifier = Modifier.fillMaxWidth(),
                    colors = TextFieldDefaults.outlinedTextFieldColors(
                        textColor = darkText,
                        focusedBorderColor = accentText,
                        unfocusedBorderColor = Color.LightGray,
                        focusedLabelColor = accentText,
                        unfocusedLabelColor = accentText
                    )
                )
                Spacer(modifier = Modifier.height(8.dp))

                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clickable { datePickerDialog.show() }
                ) {
                    OutlinedTextField(
                        value = ngaySinh,
                        onValueChange = {},
                        label = { Text("Ngày sinh (yyyy-MM-dd)", color = accentText) },
                        readOnly = true,
                        enabled = false,
                        modifier = Modifier.fillMaxWidth(),
                        colors = TextFieldDefaults.outlinedTextFieldColors(
                            textColor = darkText,
                            disabledTextColor = darkText,
                            focusedBorderColor = accentText,
                            unfocusedBorderColor = Color.LightGray,
                            disabledBorderColor = Color.LightGray,
                            focusedLabelColor = accentText,
                            unfocusedLabelColor = accentText,
                            disabledLabelColor = accentText
                        )
                    )
                }
                Spacer(modifier = Modifier.height(8.dp))

                OutlinedTextField(
                    value = gioiTinh,
                    onValueChange = { gioiTinh = it },
                    label = { Text("Giới tính", color = accentText) },
                    modifier = Modifier.fillMaxWidth(),
                    colors = TextFieldDefaults.outlinedTextFieldColors(
                        textColor = darkText,
                        focusedBorderColor = accentText,
                        unfocusedBorderColor = Color.LightGray,
                        focusedLabelColor = accentText,
                        unfocusedLabelColor = accentText
                    )
                )
                Spacer(modifier = Modifier.height(8.dp))

                OutlinedTextField(
                    value = soDienThoai,
                    onValueChange = { soDienThoai = it },
                    label = { Text("Số điện thoại", color = accentText) },
                    modifier = Modifier.fillMaxWidth(),
                    colors = TextFieldDefaults.outlinedTextFieldColors(
                        textColor = darkText,
                        focusedBorderColor = accentText,
                        unfocusedBorderColor = Color.LightGray,
                        focusedLabelColor = accentText,
                        unfocusedLabelColor = accentText
                    )
                )
                Spacer(modifier = Modifier.height(8.dp))

                OutlinedTextField(
                    value = diaChi,
                    onValueChange = { diaChi = it },
                    label = { Text("Địa chỉ", color = accentText) },
                    modifier = Modifier.fillMaxWidth(),
                    colors = TextFieldDefaults.outlinedTextFieldColors(
                        textColor = darkText,
                        focusedBorderColor = accentText,
                        unfocusedBorderColor = Color.LightGray,
                        focusedLabelColor = accentText,
                        unfocusedLabelColor = accentText
                    )
                )
                Spacer(modifier = Modifier.height(8.dp))

                OutlinedTextField(
                    value = bhyt,
                    onValueChange = { bhyt = it },
                    label = { Text("Số BHYT", color = accentText) },
                    modifier = Modifier.fillMaxWidth(),
                    colors = TextFieldDefaults.outlinedTextFieldColors(
                        textColor = darkText,
                        focusedBorderColor = accentText,
                        unfocusedBorderColor = Color.LightGray,
                        focusedLabelColor = accentText,
                        unfocusedLabelColor = accentText
                    )
                )
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        // Save Button
        Button(
            onClick = {
                if (ngaySinh.isBlank()) {
                    viewModel.message.value = "❌ Vui lòng chọn ngày sinh hợp lệ"
                    return@Button
                }
                val maBN = viewModel.patient.value?.maBN
                if (maBN != null) {
                    val updated = Patient(
                        maBN = maBN,
                        hoTen = hoTen,
                        ngaySinh = ngaySinh,
                        gioiTinh = gioiTinh,
                        soDienThoai = soDienThoai,
                        diaChi = diaChi,
                        bhyt = bhyt,
                        maTK = maTK!!
                    )
                    viewModel.updatePatient(maBN, updated) {
                        navController.navigate("profile") {
                            popUpTo("patientregister") { inclusive = true }
                        }
                    }
                } else if (maTK != null) {
                    val newPatient = Patient(
                        hoTen = hoTen,
                        ngaySinh = ngaySinh,
                        gioiTinh = gioiTinh,
                        soDienThoai = soDienThoai,
                        diaChi = diaChi,
                        bhyt = bhyt,
                        maTK = maTK
                    )
                    viewModel.createPatient(newPatient) { maBNCreated ->
                        if (maBNCreated != null) {
                            viewModel.message.value = "✅ Tạo hồ sơ bệnh nhân thành công"
                            navController.navigate("profile") {
                                popUpTo("patientregister") { inclusive = true }
                            }
                        } else {
                            viewModel.message.value = "❌ Tạo hồ sơ bệnh nhân thất bại"
                        }
                    }
                }
            },
            modifier = Modifier
                .fillMaxWidth()
                .height(48.dp),
            shape = RoundedCornerShape(12.dp),
            colors = ButtonDefaults.buttonColors(
                backgroundColor = pastelGreen,
                contentColor = darkText
            )
        ) {
            Text(
                "Lưu thông tin",
                fontSize = 16.sp,
                fontWeight = FontWeight.SemiBold
            )
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Navigation Buttons
        Row(
            horizontalArrangement = Arrangement.SpaceBetween,
            modifier = Modifier.fillMaxWidth()
        ) {
            Button(
                onClick = { navController.navigate("home") },
                modifier = Modifier
                    .weight(1f)
                    .height(48.dp),
                shape = RoundedCornerShape(12.dp),
                colors = ButtonDefaults.buttonColors(
                    backgroundColor = Color(0xFFE6E6FA), // Lavender for secondary button
                    contentColor = darkText
                )
            ) {
                Text(
                    "Quay về trang chủ",
                    fontSize = 14.sp,
                    fontWeight = FontWeight.SemiBold
                )
            }
            Spacer(modifier = Modifier.width(12.dp))
            Button(
                onClick = { navController.navigate("profile") },
                modifier = Modifier
                    .weight(1f)
                    .height(48.dp),
                shape = RoundedCornerShape(12.dp),
                colors = ButtonDefaults.buttonColors(
                    backgroundColor = Color(0xFFE6E6FA),
                    contentColor = darkText
                )
            ) {
                Text(
                    "Xem hồ sơ",
                    fontSize = 14.sp,
                    fontWeight = FontWeight.SemiBold
                )
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        // Message
        Text(
            message,
            color = if (message.startsWith("✅")) Color(0xFF2ECC71) else Color(0xFFD32F2F),
            style = MaterialTheme.typography.body1.copy(fontWeight = FontWeight.Medium)
        )
    }
}