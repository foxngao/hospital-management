package com.example.frontendapp.viewmodel

import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.frontendapp.data.model.BacSi
import com.example.frontendapp.data.remote.RetrofitApp
import kotlinx.coroutines.launch

class BacSiViewModel : ViewModel() {
    var bacSiList = mutableStateOf<List<BacSi>>(emptyList())

    fun loadByKhoa(maKhoa: String) {
        viewModelScope.launch {
            try {
                val res = RetrofitApp.bacSiApi.getByKhoa(maKhoa)
                if (res.isSuccessful) {
                    bacSiList.value = res.body()?.data ?: emptyList()
                }
            } catch (_: Exception) {}
        }
    }
}
