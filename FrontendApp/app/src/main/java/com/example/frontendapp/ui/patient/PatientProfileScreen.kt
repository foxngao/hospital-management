package com.example.frontendapp.ui.patient

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController
import com.example.frontendapp.viewmodel.PatientViewModel
import com.example.frontendapp.data.remote.RetrofitApp

@Composable
fun PatientProfileScreen(
    navController: NavController,
    viewModel: PatientViewModel = viewModel()
) {
    val patient = viewModel.patient.value
    val message = viewModel.message.value
    val maTK = RetrofitApp.currentUserId

    // Always fetch latest patient info when screen opens
    LaunchedEffect(key1 = true) {
        maTK?.let { viewModel.getPatientById(it) }
    }

    // Pastel color palette
    val pastelBlue = Color(0xFFD6EAF8) // Soft blue for background
    val pastelPink = Color(0xFFFADADD) // Soft pink for buttons
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
            "Thông tin bệnh nhân",
            style = MaterialTheme.typography.h5.copy(
                fontWeight = FontWeight.Bold,
                color = darkText
            )
        )
        Spacer(modifier = Modifier.height(12.dp))

        // Account and Patient ID
        Card(
            modifier = Modifier.fillMaxWidth(),
            backgroundColor = pastelWhite,
            shape = RoundedCornerShape(12.dp),
            elevation = 4.dp
        ) {
            Column(
                modifier = Modifier.padding(16.dp)
            ) {
                maTK?.let {
                    Text(
                        "Mã tài khoản: $it",
                        style = MaterialTheme.typography.body1.copy(
                            color = darkText,
                            fontWeight = FontWeight.Medium
                        )
                    )
                }

                if (!patient?.maBN.isNullOrBlank()) {
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        "Mã bệnh nhân: ${patient?.maBN}",
                        style = MaterialTheme.typography.body1.copy(
                            color = darkText,
                            fontWeight = FontWeight.Medium
                        )
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Patient Details
        if (patient != null) {
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
                        value = patient.hoTen ?: "",
                        onValueChange = {},
                        label = { Text("Họ tên", color = accentText) },
                        readOnly = true,
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
                    Spacer(modifier = Modifier.height(8.dp))

                    OutlinedTextField(
                        value = patient.ngaySinh ?: "",
                        onValueChange = {},
                        label = { Text("Ngày sinh", color = accentText) },
                        readOnly = true,
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
                    Spacer(modifier = Modifier.height(8.dp))

                    OutlinedTextField(
                        value = patient.gioiTinh ?: "",
                        onValueChange = {},
                        label = { Text("Giới tính", color = accentText) },
                        readOnly = true,
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
                    Spacer(modifier = Modifier.height(8.dp))

                    OutlinedTextField(
                        value = patient.soDienThoai ?: "",
                        onValueChange = {},
                        label = { Text("Số điện thoại", color = accentText) },
                        readOnly = true,
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
                    Spacer(modifier = Modifier.height(8.dp))

                    OutlinedTextField(
                        value = patient.diaChi ?: "",
                        onValueChange = {},
                        label = { Text("Địa chỉ", color = accentText) },
                        readOnly = true,
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
                    Spacer(modifier = Modifier.height(8.dp))

                    OutlinedTextField(
                        value = patient.bhyt ?: "",
                        onValueChange = {},
                        label = { Text("Số BHYT", color = accentText) },
                        readOnly = true,
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
            }
        } else {
            Text(
                "❗ Không có dữ liệu hồ sơ. Vui lòng tạo mới.",
                color = Color(0xFFD32F2F), // Red for error
                style = MaterialTheme.typography.body1.copy(fontWeight = FontWeight.Medium)
            )
        }

        Spacer(modifier = Modifier.height(24.dp))

        // Buttons
        Button(
            onClick = { navController.navigate("patient-register") },
            modifier = Modifier
                .fillMaxWidth()
                .height(48.dp),
            shape = RoundedCornerShape(12.dp),
            colors = ButtonDefaults.buttonColors(
                backgroundColor = pastelPink,
                contentColor = darkText
            )
        ) {
            Text(
                if (patient == null) "Điền thông tin" else "Cập nhật thông tin",
                fontSize = 16.sp,
                fontWeight = FontWeight.SemiBold
            )
        }

        Spacer(modifier = Modifier.height(12.dp))

        Button(
            onClick = { navController.navigate("home") },
            modifier = Modifier
                .fillMaxWidth()
                .height(48.dp),
            shape = RoundedCornerShape(12.dp),
            colors = ButtonDefaults.buttonColors(
                backgroundColor = Color(0xFFE6E6FA), // Lavender for secondary button
                contentColor = darkText
            )
        ) {
            Text(
                "Về trang chủ",
                fontSize = 16.sp,
                fontWeight = FontWeight.SemiBold
            )
        }

        Spacer(modifier = Modifier.height(12.dp))

        // Message
        if (message.isNotBlank()) {
            Text(
                text = message,
                color = if (message.startsWith("✅")) Color(0xFF2ECC71) else Color(0xFFD32F2F),
                style = MaterialTheme.typography.body1.copy(fontWeight = FontWeight.Medium)
            )
        }
    }
}