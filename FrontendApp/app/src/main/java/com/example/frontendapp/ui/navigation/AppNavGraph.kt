package com.example.frontendapp.ui.navigation

import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.example.frontendapp.ui.auth.*
import com.example.frontendapp.ui.home.*
import com.example.frontendapp.ui.patient.*
import com.example.frontendapp.ui.appointment.*
import com.example.frontendapp.viewmodel.AppointmentViewModel
import com.example.frontendapp.viewmodel.MedicalRecordViewModel
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.frontendapp.data.remote.RetrofitApp
import com.example.frontendapp.ui.medical.MedicalRecordListScreen
import com.example.frontendapp.ui.xetnghiem.XetNghiemDetailScreen
import com.example.frontendapp.viewmodel.PatientViewModel
import com.example.frontendapp.ui.xetnghiem.XetNghiemFormScreen
import com.example.frontendapp.ui.xetnghiem.XetNghiemListScreen
import com.example.frontendapp.viewmodel.XetNghiemViewModel
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.example.frontendapp.ui.components.DonThuocDetailScreen
import com.example.frontendapp.ui.components.PhieuKhamDetailScreen

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AppNavGraph(navController: NavHostController) {
    val appointmentViewModel: AppointmentViewModel = viewModel()
    val medicalRecordViewModel: MedicalRecordViewModel = viewModel()
    NavHost(navController = navController, startDestination = "welcome") {

        // Home
        composable("welcome") { WelcomeScreen(navController) }
        composable("home") { MainHomeScreen(navController) }

        // Auth
        // Account Info
        composable("account-info") { AccountInfoScreen(navController) }
        composable("login") { LoginScreen(navController) }
        composable("register") {
            RegisterScreen(navController = navController)
        }
        composable("forgot") { ForgotPasswordScreen() }
        composable("reset") { ResetPasswordScreen(navController) }

        // Patient
        composable("patient-register") { PatientRegisterScreen(navController) }
        composable("profile") { PatientProfileScreen(navController) }

        // Appointment
        composable("appointment-list") {
            AppointmentListScreen(appointmentViewModel = appointmentViewModel, navController = navController)
        }

        composable("appointment-form") {
            val appointmentVM: AppointmentViewModel = viewModel()
            val patientVM: PatientViewModel = viewModel()
            AppointmentFormScreen(
                navController = navController,
                appointmentViewModel = appointmentVM,
                patientViewModel = patientVM
            )

        }



        composable("appointment-form") {
            val appointmentVM: AppointmentViewModel = viewModel()
            val patientVM: PatientViewModel = viewModel()
            AppointmentFormScreen(
                navController = navController,
                appointmentViewModel = appointmentVM,
                patientViewModel = patientVM
            )
        }

        composable("medical-record") {
            val maTK = RetrofitApp.currentUserId
            val patientVM: PatientViewModel = viewModel()
            val medicalVM: MedicalRecordViewModel = viewModel()

            LaunchedEffect(maTK) {
                if (maTK != null) {
                    patientVM.getPatientById(maTK)
                }
            }

            val patient = patientVM.patient.value
            val maHSBA = patient?.maBN

            if (maHSBA.isNullOrBlank()) {
                Text("🔄 Đang tải hồ sơ bệnh án...")
            } else {
                MedicalRecordListScreen(
                    maHSBA = maHSBA,
                    viewModel = medicalVM,
                    patientViewModel = patientVM,
                    navController = navController
                )
            }
        }


        // Xét nghiệm
        composable("xetnghiem-list") {
            val viewModel: XetNghiemViewModel = viewModel()
            val patientVM: PatientViewModel = viewModel()
            XetNghiemListScreen(
                navController = navController,
                xetNghiemViewModel = viewModel,
                patientViewModel = patientVM
            )
        }

        composable("xetnghiem-form") {
            val viewModel: XetNghiemViewModel = viewModel()
            val patientVM: PatientViewModel = viewModel()
            XetNghiemFormScreen(
                navController = navController,
                xetNghiemViewModel = viewModel,
                patientViewModel = patientVM
            )
        }


        composable("xetnghiem-detail/{maPhieuXN}") { backStackEntry ->
            val maPhieuXN = backStackEntry.arguments?.getString("maPhieuXN") ?: ""
            XetNghiemDetailScreen(navController, maPhieuXN)
        }

        composable("phieukham-detail/{maPK}") {
            val maPK = it.arguments?.getString("maPK") ?: ""
            val medicalVM: MedicalRecordViewModel = viewModel()
            val phieu = medicalVM.danhSachPhieuKham.value.find { it.maPK == maPK }

            if (phieu != null) {
                PhieuKhamDetailScreen(phieu)
            } else {
                Text("❌ Không tìm thấy phiếu khám")
            }
        }

        composable("donthuoc-detail/{maDT}") {
            val maDT = it.arguments?.getString("maDT") ?: ""
            val medicalVM: MedicalRecordViewModel = viewModel()
            val don = medicalVM.danhSachDonThuoc.value.find { it.maDT == maDT }

            if (don != null) {
                DonThuocDetailScreen(don)
            } else {
                Text("❌ Không tìm thấy đơn thuốc")
            }
        }

    }
}
