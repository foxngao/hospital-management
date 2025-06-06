package com.example.frontendapp.ui.auth

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController
import com.example.frontendapp.data.model.auth.ResetPasswordRequest
import com.example.frontendapp.viewmodel.AuthViewModel

@Composable
fun ResetPasswordScreen(
    navController: NavController,
    viewModel: AuthViewModel = viewModel()
) {
    val maTKState = viewModel.user.value?.maTK
    var maTK by remember { mutableStateOf(maTKState ?: "") }
    var matKhauCu by remember { mutableStateOf("") }
    var matKhauMoi by remember { mutableStateOf("") }
    var localMessage by remember { mutableStateOf("") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp)
            .background(Color(0xFFE3F2FD)), // Xanh dương pastel nhạt
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            "Đổi mật khẩu",
            style = MaterialTheme.typography.headlineSmall,
            color = Color(0xFF0D3B66), // Xanh đậm cho tiêu đề
            fontWeight = FontWeight.Bold,
            modifier = Modifier.padding(bottom = 24.dp)
        )

        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 8.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White),
            elevation = CardDefaults.cardElevation(defaultElevation = 4.dp),
            shape = RoundedCornerShape(16.dp)
        ) {
            Column(
                modifier = Modifier.padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                OutlinedTextField(
                    value = maTK,
                    onValueChange = { maTK = it },
                    label = { Text("Mã tài khoản", color = Color(0xFF455A64)) }, // Xám xanh đậm
                    modifier = Modifier.fillMaxWidth(),
                    enabled = maTKState == null,
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedBorderColor = Color(0xFF4CAF50), // Xanh lá pastel đậm khi focus
                        unfocusedBorderColor = Color(0xFFB0BEC5), // Xám nhạt khi không focus
                        disabledTextColor = Color(0xFF0D3B66),
                        disabledBorderColor = Color(0xFFB0BEC5),
                        focusedTextColor = Color(0xFF0D3B66),
                        unfocusedTextColor = Color(0xFF0D3B66)
                    ),
                    shape = RoundedCornerShape(8.dp)
                )

                OutlinedTextField(
                    value = matKhauCu,
                    onValueChange = { matKhauCu = it },
                    label = { Text("Mật khẩu hiện tại", color = Color(0xFF455A64)) },
                    modifier = Modifier.fillMaxWidth(),
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedBorderColor = Color(0xFF4CAF50),
                        unfocusedBorderColor = Color(0xFFB0BEC5),
                        focusedTextColor = Color(0xFF0D3B66),
                        unfocusedTextColor = Color(0xFF0D3B66)
                    ),
                    shape = RoundedCornerShape(8.dp)
                )

                OutlinedTextField(
                    value = matKhauMoi,
                    onValueChange = { matKhauMoi = it },
                    label = { Text("Mật khẩu mới", color = Color(0xFF455A64)) },
                    modifier = Modifier.fillMaxWidth(),
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedBorderColor = Color(0xFF4CAF50),
                        unfocusedBorderColor = Color(0xFFB0BEC5),
                        focusedTextColor = Color(0xFF0D3B66),
                        unfocusedTextColor = Color(0xFF0D3B66)
                    ),
                    shape = RoundedCornerShape(8.dp)
                )

                Button(
                    onClick = {
                        localMessage = ""
                        if (matKhauMoi == matKhauCu) {
                            localMessage = "⚠️ Mật khẩu mới không được trùng mật khẩu cũ"
                            return@Button
                        }
                        viewModel.resetPassword(
                            ResetPasswordRequest(
                                maTK = maTK,
                                matKhauCu = matKhauCu,
                                matKhauMoi = matKhauMoi
                            )
                        ) {
                            viewModel.logout()
                            navController.navigate("welcome") {
                                popUpTo("reset") { inclusive = true }
                            }
                        }
                    },
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(48.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFC8E6C9)), // Xanh lá pastel nhạt
                    shape = RoundedCornerShape(8.dp)
                ) {
                    Icon(
                        imageVector = Icons.Default.Refresh,
                        contentDescription = "Cập nhật mật khẩu",
                        modifier = Modifier.size(18.dp),
                        tint = Color(0xFF2F855A) // Xanh lá đậm
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        "Cập nhật",
                        color = Color(0xFF2F855A),
                        fontWeight = FontWeight.Medium
                    )
                }

                if (localMessage.isNotBlank() || viewModel.message.value.isNotBlank()) {
                    Text(
                        text = localMessage.ifBlank { viewModel.message.value },
                        color = Color(0xFFEF9A9A), // Đỏ pastel nhạt cho thông báo lỗi
                        style = MaterialTheme.typography.bodyMedium,
                        modifier = Modifier.align(Alignment.CenterHorizontally)
                    )
                }
            }
        }
    }
}