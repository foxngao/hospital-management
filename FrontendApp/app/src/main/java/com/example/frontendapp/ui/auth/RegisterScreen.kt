package com.example.frontendapp.ui.auth

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import com.example.frontendapp.data.model.auth.RegisterRequest
import com.example.frontendapp.viewmodel.AuthViewModel
import com.example.frontendapp.viewmodel.PatientViewModel
import com.example.frontendapp.data.remote.RetrofitApp

@Composable
fun RegisterScreen(
    navController: NavHostController,
    authViewModel: AuthViewModel = viewModel(),
    patientViewModel: PatientViewModel = viewModel()
) {
    var maTK by remember { mutableStateOf<String?>(null) }

    var tenDangNhap by remember { mutableStateOf("") }
    var matKhau by remember { mutableStateOf("") }
    var xacNhanMatKhau by remember { mutableStateOf("") }
    var email by remember { mutableStateOf("") }

    val registerMessage = authViewModel.message.value
    val matKhauMatch = xacNhanMatKhau == matKhau

    val pastelBlue = Color(0xFFD6EAF8)
    val pastelWhite = Color(0xFFF8FAFC)
    val pastelGreen = Color(0xFFD4EFDF)
    val darkText = Color(0xFF2D3748)
    val accentText = Color(0xFF4A90E2)

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(pastelBlue)
            .padding(horizontal = 24.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 24.dp),
            shape = RoundedCornerShape(20.dp),
            colors = CardDefaults.cardColors(containerColor = pastelWhite),
            elevation = CardDefaults.cardElevation(defaultElevation = 10.dp)
        ) {
            Column(
                modifier = Modifier
                    .padding(24.dp)
                    .fillMaxWidth(),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Text(
                    "🔐 Đăng ký tài khoản",
                    style = MaterialTheme.typography.headlineMedium.copy(
                        fontWeight = FontWeight.ExtraBold,
                        color = darkText,
                        fontSize = 30.sp
                    )
                )

                if (maTK == null) {
                    Spacer(modifier = Modifier.height(28.dp))

                    OutlinedTextField(
                        value = tenDangNhap,
                        onValueChange = { tenDangNhap = it },
                        label = { Text("Tên đăng nhập") },
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(12.dp),
                        colors = TextFieldDefaults.colors(
                            focusedTextColor = darkText,
                            unfocusedTextColor = darkText,
                            focusedContainerColor = Color.White,
                            unfocusedContainerColor = Color.White,
                            focusedIndicatorColor = accentText,
                            unfocusedIndicatorColor = Color(0xFFD0D5DD)
                        )
                    )

                    Spacer(modifier = Modifier.height(16.dp))

                    OutlinedTextField(
                        value = matKhau,
                        onValueChange = { matKhau = it },
                        label = { Text("Mật khẩu") },
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(12.dp),
                        colors = TextFieldDefaults.colors(
                            focusedTextColor = darkText,
                            unfocusedTextColor = darkText,
                            focusedContainerColor = Color.White,
                            unfocusedContainerColor = Color.White,
                            focusedIndicatorColor = accentText,
                            unfocusedIndicatorColor = Color(0xFFD0D5DD)
                        )
                    )

                    Spacer(modifier = Modifier.height(16.dp))

                    OutlinedTextField(
                        value = xacNhanMatKhau,
                        onValueChange = { xacNhanMatKhau = it },
                        label = { Text("Xác nhận mật khẩu") },
                        isError = !matKhauMatch && xacNhanMatKhau.isNotBlank(),
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(12.dp),
                        colors = TextFieldDefaults.colors(
                            focusedTextColor = darkText,
                            unfocusedTextColor = darkText,
                            focusedContainerColor = Color.White,
                            unfocusedContainerColor = Color.White,
                            focusedIndicatorColor = if (matKhauMatch) accentText else Color(0xFFD32F2F),
                            unfocusedIndicatorColor = Color(0xFFD0D5DD)
                        )
                    )

                    if (!matKhauMatch && xacNhanMatKhau.isNotBlank()) {
                        Spacer(modifier = Modifier.height(8.dp))
                        Text(
                            "❌ Mật khẩu xác nhận không khớp",
                            color = Color(0xFFD32F2F),
                            fontSize = 15.sp
                        )
                    } else if (matKhauMatch && xacNhanMatKhau.isNotBlank()) {
                        Spacer(modifier = Modifier.height(8.dp))
                        Text(
                            "✅ Mật khẩu xác nhận khớp",
                            color = Color(0xFF2ECC71),
                            fontSize = 15.sp
                        )
                    }

                    Spacer(modifier = Modifier.height(16.dp))

                    OutlinedTextField(
                        value = email,
                        onValueChange = { email = it },
                        label = { Text("Email") },
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(12.dp),
                        colors = TextFieldDefaults.colors(
                            focusedTextColor = darkText,
                            unfocusedTextColor = darkText,
                            focusedContainerColor = Color.White,
                            unfocusedContainerColor = Color.White,
                            focusedIndicatorColor = accentText,
                            unfocusedIndicatorColor = Color(0xFFD0D5DD)
                        )
                    )

                    Spacer(modifier = Modifier.height(32.dp))

                    Button(
                        onClick = {
                            val request = RegisterRequest(
                                tenDangNhap = tenDangNhap,
                                matKhau = matKhau,
                                email = email,
                                xacNhanMatKhau = xacNhanMatKhau,
                                maNhom = "BENHNHAN"
                            )
                            authViewModel.register(request,
                                onSuccess = { returnedMaTK ->
                                    RetrofitApp.currentUserId = returnedMaTK
                                    navController.navigate("home") {
                                        popUpTo("register") { inclusive = true }
                                    }
                                },
                                onFailure = {}
                            )
                        },
                        enabled = matKhauMatch,
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(56.dp),
                        shape = RoundedCornerShape(16.dp),
                        colors = ButtonDefaults.buttonColors(
                            containerColor = pastelGreen,
                            contentColor = darkText
                        )
                    ) {
                        Text("Đăng ký tài khoản", fontSize = 18.sp, fontWeight = FontWeight.ExtraBold)
                    }

                    if (registerMessage.isNotBlank()) {
                        Spacer(modifier = Modifier.height(12.dp))
                        Text(registerMessage, color = Color(0xFFD32F2F), fontSize = 15.sp)
                    }

                    Spacer(modifier = Modifier.height(16.dp))

                    TextButton(onClick = { navController.navigate("login") }) {
                        Text("Đã có tài khoản? Đăng nhập", color = accentText, fontSize = 14.sp)
                    }
                }
            }
        }
    }
}
