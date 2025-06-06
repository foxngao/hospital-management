package com.example.frontendapp.ui.auth

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController
import com.example.frontendapp.viewmodel.AuthViewModel

@Composable
fun AccountInfoScreen(
    navController: NavController,
    authViewModel: AuthViewModel = viewModel()
) {
    val user = authViewModel.user.value
    val message = authViewModel.message.value

    // ✅ Tự động gọi nếu user trống
    LaunchedEffect(Unit) {
        if (user == null) {
            authViewModel.loadCurrentUser()
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp)
            .background(Color(0xFFE3F2FD)), // Xanh dương pastel nhạt
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            "Thông tin tài khoản",
            style = MaterialTheme.typography.headlineSmall,
            color = Color(0xFF0D3B66), // Xanh đậm
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
                if (user != null) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Default.Person,
                            contentDescription = "Mã tài khoản",
                            modifier = Modifier.size(20.dp),
                            tint = Color(0xFF0D3B66)
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        Text("👤 Mã tài khoản: ${user.maTK}", color = Color(0xFF0D3B66))
                    }
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Default.Person,
                            contentDescription = "Email",
                            modifier = Modifier.size(20.dp),
                            tint = Color(0xFF0D3B66)
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        Text("📧 Email: ${user.email ?: "Không có"}", color = Color(0xFF0D3B66))
                    }
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Default.Lock,
                            contentDescription = "Nhóm quyền",
                            modifier = Modifier.size(20.dp),
                            tint = Color(0xFF0D3B66)
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        Text("🔒 Nhóm quyền: ${user.maNhom}", color = Color(0xFF0D3B66))
                    }
                } else {
                    Text(
                        "🔒 $message",
                        color = Color(0xFFEF9A9A), // Đỏ pastel nhạt
                        style = MaterialTheme.typography.bodyLarge,
                        modifier = Modifier.align(Alignment.CenterHorizontally)
                    )
                }

                Spacer(modifier = Modifier.height(24.dp))

                Button(
                    onClick = { navController.navigate("forgot") },
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(48.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFC8E6C9)), // Xanh lá pastel
                    shape = RoundedCornerShape(8.dp)
                ) {
                    Icon(
                        imageVector = Icons.Default.Lock,
                        contentDescription = "Quên mật khẩu",
                        modifier = Modifier.size(18.dp),
                        tint = Color(0xFF2F855A)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text("Quên mật khẩu", color = Color(0xFF2F855A), fontWeight = FontWeight.Medium)
                }

                Button(
                    onClick = { navController.navigate("reset") },
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(48.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFB2EBF2)), // Xanh dương pastel
                    shape = RoundedCornerShape(8.dp)
                ) {
                    Icon(
                        imageVector = Icons.Default.Settings,
                        contentDescription = "Đổi mật khẩu",
                        modifier = Modifier.size(18.dp),
                        tint = Color(0xFF0288D1)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text("Đổi mật khẩu", color = Color(0xFF0288D1), fontWeight = FontWeight.Medium)
                }
            }
        }
    }
}