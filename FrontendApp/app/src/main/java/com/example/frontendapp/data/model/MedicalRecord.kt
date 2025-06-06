package com.example.frontendapp.data.model

import com.google.gson.annotations.SerializedName

data class MedicalRecord(
    @SerializedName("maHSBA") val maHSBA: String?,
    @SerializedName("maBN") val maBN: String?,
    @SerializedName("ngayLap") val ngayLap: String?,
    @SerializedName("dotKhamBenh") val dotKhamBenh: String?,
    @SerializedName("lichSuBenh") val lichSuBenh: String?,
    @SerializedName("ghiChu") val ghiChu: String?
)