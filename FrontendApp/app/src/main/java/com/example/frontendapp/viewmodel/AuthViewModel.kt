package com.example.frontendapp.viewmodel

import android.app.Application
import android.content.Context
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.example.frontendapp.data.remote.AuthApiService
import kotlinx.coroutines.launch
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import androidx.compose.runtime.mutableStateOf
import com.example.frontendapp.data.model.auth.ForgotPasswordRequest
import com.example.frontendapp.data.model.auth.LoginRequest
import com.example.frontendapp.data.model.auth.RegisterRequest
import com.example.frontendapp.data.model.auth.ResetPasswordRequest
import com.example.frontendapp.data.model.auth.User
import com.example.frontendapp.data.remote.RetrofitApp

class AuthViewModel(application: Application) : AndroidViewModel(application) {
    private val prefs = application.getSharedPreferences("app", Context.MODE_PRIVATE)

    // ✅ Trỏ về backendWeb
    private val api: AuthApiService = Retrofit.Builder()
        .baseUrl("http://10.0.2.2:4000/api/") // backendWeb port
        .addConverterFactory(GsonConverterFactory.create())
        .build()
        .create(AuthApiService::class.java)

    var token = mutableStateOf(prefs.getString("token", null))
    var user = mutableStateOf<User?>(null)
    var message = mutableStateOf("")

    fun login(request: LoginRequest) {
        viewModelScope.launch {
            try {
                val res = api.login(request)
                if (res.isSuccessful) {
                    val body = res.body()
                    token.value = body?.token
                    user.value = body?.user
                    RetrofitApp.token = body?.token
                    RetrofitApp.currentUserId = body?.user?.maTK
                    prefs.edit().putString("token", token.value).apply()
                    message.value = "Đăng nhập thành công"
                } else {
                    message.value = when (res.code()) {
                        404 -> "❌ Tài khoản không tồn tại"
                        401 -> "❌ Mật khẩu không đúng"
                        403 -> "❌ Tài khoản bị khóa"
                        else -> "❌ Lỗi đăng nhập: ${res.code()}"
                    }
                    token.value = null
                    user.value = null
                }
            } catch (e: Exception) {
                message.value = "❌ Không thể kết nối máy chủ"
                token.value = null
                user.value = null
            }
        }
    }



    fun register(request: RegisterRequest, onSuccess: (String) -> Unit, onFailure: () -> Unit) {
        viewModelScope.launch {
            try {
                val res = RetrofitApp.authApi.register(request)
                val body = res.body()

                if (res.isSuccessful && body?.success == true) {
                    val maTK = body.user?.maTK
                    if (maTK != null) {
                        token.value = body.token
                        // ✅ Gán token + maTK vào RetrofitApp
                        RetrofitApp.token = body.token
                        RetrofitApp.currentUserId = maTK

                        prefs.edit().putString("token", token.value).apply()
                        message.value = "✅ Đăng ký thành công"
                        onSuccess(maTK)
                    } else {
                        message.value = "❌ Không lấy được mã tài khoản từ response"
                        onFailure()
                    }
                } else {
                    val errorBody = res.errorBody()?.string()
                    message.value = "❌ Đăng ký thất bại: ${res.code()} | ${res.message()} \n$errorBody"
                    onFailure()
                }
            } catch (e: Exception) {
                message.value = "❌ Lỗi kết nối: ${e.message}"
                onFailure()
            }
        }
    }

    fun loadCurrentUser() {
        viewModelScope.launch {
            try {
                val res = RetrofitApp.authApi.getCurrentUser()
                if (res.isSuccessful && res.body() != null) {
                    user.value = res.body()
                    message.value = ""
                } else {
                    message.value = "⚠️ Không lấy được thông tin người dùng"
                }
            } catch (e: Exception) {
                message.value = "❌ Lỗi kết nối khi load user: ${e.message}"
            }
        }
    }

    fun resetPassword(data: ResetPasswordRequest, onSuccess: () -> Unit = {}) {
        viewModelScope.launch {
            try {
                val response = api.resetPassword(data)
                if (response.isSuccessful) {
                    message.value = "✅ Đổi mật khẩu thành công"
                    onSuccess() // ✅ Gọi callback
                } else {
                    message.value = "❌ Đổi mật khẩu thất bại"
                }
            } catch (e: Exception) {
                message.value = "❌ Lỗi hệ thống"
            }
        }
    }


    fun forgotPassword(maTK: String, maBN: String, email: String) {
        viewModelScope.launch {
            val res = RetrofitApp.authApi.forgotPassword(
                ForgotPasswordRequest(maTK, maBN, email)
            )
            if (res.isSuccessful) {
                message.value = "Đã gửi email khôi phục"
            } else {
                message.value = "Không tìm thấy email"
            }
        }
    }

    fun getVerifyCode(maTaiKhoan: String, onResult: (String?) -> Unit) {
        viewModelScope.launch {
            val response = api.getVerifyCode(maTaiKhoan)
            if (response.isSuccessful) {
                val code = response.body()?.get("message")?.toString()
                onResult(code)
            } else {
                message.value = "Không thể lấy mã xác thực"
                onResult(null)
            }
        }
    }

    fun logout() {
        token.value = null
        user.value = null
        prefs.edit().remove("token").apply()
    }
}
