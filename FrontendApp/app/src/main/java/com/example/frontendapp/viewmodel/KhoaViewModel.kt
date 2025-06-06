// 📁 path: viewmodel/KhoaViewModel.kt
package com.example.frontendapp.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.frontendapp.data.model.Khoa
import com.example.frontendapp.data.remote.RetrofitApp
import kotlinx.coroutines.launch
import kotlinx.coroutines.flow.MutableStateFlow

class KhoaViewModel : ViewModel() {
    var khoaList = MutableStateFlow<List<Khoa>>(emptyList())

    fun loadKhoaList() {
        viewModelScope.launch {
            try {
                val res = RetrofitApp.khoaApi.getAll()
                if (res.isSuccessful) {
                    khoaList.value = res.body()?.data ?: emptyList()
                }
            } catch (_: Exception) {}
        }
    }
}
