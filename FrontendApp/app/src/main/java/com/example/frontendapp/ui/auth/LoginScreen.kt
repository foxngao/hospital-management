package com.example.frontendapp.ui.auth

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.frontendapp.data.model.auth.LoginRequest
import com.example.frontendapp.viewmodel.AuthViewModel
import androidx.navigation.NavController

@Composable
fun LoginScreen(navController: NavController, viewModel: AuthViewModel = viewModel()) {
    var tenDangNhap by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }

    val token = viewModel.token.value
    val message = viewModel.message.value

    val accentText = Color(0xFF4A90E2)
    val darkText = Color(0xFF2D3748)
    val pastelGreen = Color(0xFFD4EFDF)

    // Nếu có token → chuyển sang trang chính
    LaunchedEffect(token) {
        if (token != null) {
            navController.navigate("home") {
                popUpTo("login") { inclusive = true }
            }
            viewModel.message.value = ""
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            "🔐 Đăng nhập",
            style = MaterialTheme.typography.headlineMedium.copy(
                fontWeight = FontWeight.ExtraBold,
                fontSize = 28.sp,
                color = darkText
            )
        )

        Spacer(modifier = Modifier.height(24.dp))

        OutlinedTextField(
            value = tenDangNhap,
            onValueChange = { tenDangNhap = it },
            label = { Text("Tên đăng nhập") },
            modifier = Modifier.fillMaxWidth(),
            shape = MaterialTheme.shapes.medium,
            colors = TextFieldDefaults.colors(
                focusedTextColor = darkText,
                unfocusedTextColor = darkText,
                focusedContainerColor = Color.White,
                unfocusedContainerColor = Color.White,
                focusedIndicatorColor = accentText,
                unfocusedIndicatorColor = Color.Gray
            )
        )

        Spacer(modifier = Modifier.height(16.dp))

        OutlinedTextField(
            value = password,
            onValueChange = { password = it },
            label = { Text("Mật khẩu") },
            modifier = Modifier.fillMaxWidth(),
            shape = MaterialTheme.shapes.medium,
            colors = TextFieldDefaults.colors(
                focusedTextColor = darkText,
                unfocusedTextColor = darkText,
                focusedContainerColor = Color.White,
                unfocusedContainerColor = Color.White,
                focusedIndicatorColor = accentText,
                unfocusedIndicatorColor = Color.Gray
            )
        )

        Spacer(modifier = Modifier.height(24.dp))

        Button(
            onClick = {
                viewModel.login(LoginRequest(tenDangNhap, password))
            },
            modifier = Modifier
                .fillMaxWidth()
                .height(50.dp),
            colors = ButtonDefaults.buttonColors(
                containerColor = pastelGreen,
                contentColor = darkText
            )
        ) {
            Text("Đăng nhập", fontSize = 18.sp, fontWeight = FontWeight.Bold)
        }

        Spacer(modifier = Modifier.height(12.dp))

        if (message.isNotBlank() && token == null) {
            Text(
                text = "❌ Đăng nhập thất bại: $message",
                color = Color(0xFFD32F2F),
                fontSize = 15.sp
            )
        }

        Spacer(modifier = Modifier.height(20.dp))

        TextButton(
            onClick = { navController.navigate("forgot") },
            modifier = Modifier.align(Alignment.CenterHorizontally)
        ) {
            Text("Quên mật khẩu?", color = accentText, fontWeight = FontWeight.SemiBold)
        }
    }
}
