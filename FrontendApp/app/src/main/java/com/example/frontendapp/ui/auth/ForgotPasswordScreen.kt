package com.example.frontendapp.ui.auth

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.frontendapp.viewmodel.AuthViewModel

@Composable
fun ForgotPasswordScreen(viewModel: AuthViewModel = viewModel()) {
    var maTK by remember { mutableStateOf("") }
    var maBN by remember { mutableStateOf("") }
    var email by remember { mutableStateOf("") }

    Column(modifier = Modifier.padding(16.dp)) {
        Text("Quên mật khẩu", style = MaterialTheme.typography.headlineSmall)

        OutlinedTextField(value = maTK, onValueChange = { maTK = it }, label = { Text("Mã tài khoản") })
        OutlinedTextField(value = maBN, onValueChange = { maBN = it }, label = { Text("Mã bệnh nhân") })
        OutlinedTextField(value = email, onValueChange = { email = it }, label = { Text("Email") })

        Spacer(modifier = Modifier.height(16.dp))
        Button(onClick = {
            viewModel.forgotPassword(maTK, maBN, email)
        }) {
            Text("Gửi mã xác thực")
        }

        Spacer(modifier = Modifier.height(8.dp))
        Text(viewModel.message.value, color = MaterialTheme.colorScheme.error)
    }
}

