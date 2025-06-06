package com.example.frontendapp.ui.home

import android.content.Context
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController
import com.example.frontendapp.R
import com.example.frontendapp.viewmodel.PatientViewModel

@Composable
fun MainHomeScreen(navController: NavController) {
    val context = LocalContext.current
    val userName = remember { mutableStateOf(getUserName(context)) }
    var isMenuOpen by remember { mutableStateOf(false) }

    // Adjusted pastel hospital color palette
    val pastelBlue = Color(0xFFE6F0FA) // Softer blue for backgrounds
    val pastelGreen = Color(0xFFD9EAD3) // Softer green for accents
    val pastelWhite = Color(0xFFFCFDFE) // Cleaner white for main content
    val darkText = Color(0xFF1A3C5A) // Softer dark for primary text
    val accentText = Color(0xFF6B7280) // Muted gray for secondary text

    val patientVM: PatientViewModel = viewModel()
    val patient = patientVM.patient.value
    LaunchedEffect(Unit) {
        patientVM.loadCurrentPatient()
    }

    Row(modifier = Modifier.fillMaxSize()) {
        // Sidebar
        if (isMenuOpen) {
            Column(
                modifier = Modifier
                    .width(260.dp)
                    .fillMaxHeight()
                    .background(pastelBlue)
                    .padding(20.dp)
            ) {
                // User profile section
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier.padding(bottom = 20.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(50.dp)
                            .background(pastelGreen, CircleShape)
                            .clip(CircleShape)
                            .shadow(4.dp, CircleShape),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            userName.value.first().toString().uppercase(),
                            color = Color.White,
                            fontSize = 22.sp,
                            fontWeight = FontWeight.Bold,
                            style = MaterialTheme.typography.titleMedium
                        )
                    }
                    Spacer(modifier = Modifier.width(12.dp))
                    Text(
                        "Xin chào, ${userName.value}",
                        color = darkText,
                        fontSize = 18.sp,
                        fontWeight = FontWeight.SemiBold,
                        style = MaterialTheme.typography.titleSmall
                    )
                }

                // Menu items
                MenuItem(
                    text = "Tài khoản",
                    icon = R.drawable.ic_account, // Replace with account icon
                    onClick = { navController.navigate("account-info") },
                    textColor = darkText,
                    iconTint = accentText
                )
                MenuItem(
                    text = "Thông tin cá nhân",
                    icon = R.drawable.ic_profile, // Replace with profile icon
                    onClick = { navController.navigate("profile") },
                    textColor = darkText,
                    iconTint = accentText
                )
                MenuItem(
                    text = "Hồ sơ bệnh án",
                    icon = R.drawable.ic_medical, // Replace with medical record icon
                    onClick = { navController.navigate("medical-record") },
                    textColor = darkText,
                    iconTint = accentText
                )
                MenuItem(
                    text = "Đặt lịch hẹn khám",
                    icon = R.drawable.ic_appointment, // Replace with appointment icon
                    onClick = { navController.navigate("appointment-list") },
                    textColor = darkText,
                    iconTint = accentText
                )
                MenuItem(
                    text = "Xét nghiệm",
                    icon = R.drawable.ic_test, // Replace with test icon
                    onClick = { navController.navigate("xetnghiem-list") },
                    textColor = darkText,
                    iconTint = accentText
                )
                Spacer(modifier = Modifier.weight(1f))
                MenuItem(
                    text = "Đăng xuất",
                    icon = R.drawable.ic_logout, // Replace with logout icon
                    onClick = {
                        context.getSharedPreferences("app", Context.MODE_PRIVATE).edit().clear().apply()
                        navController.navigate("welcome") {
                            popUpTo("home") { inclusive = true }
                        }
                    },
                    textColor = Color(0xFFEF5350), // Softer red for logout
                    iconTint = Color(0xFFEF5350)
                )
            }
        }

        // Main content
        Column(
            modifier = Modifier
                .fillMaxSize()
                .background(pastelWhite)
                .padding(20.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            // Header with menu button
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 8.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    "Bệnh viện ABC",
                    color = darkText,
                    fontSize = 24.sp,
                    fontWeight = FontWeight.Bold,
                    style = MaterialTheme.typography.headlineMedium
                )
                IconButton(
                    onClick = { isMenuOpen = !isMenuOpen },
                    modifier = Modifier
                        .size(48.dp)
                        .background(pastelGreen, CircleShape)
                ) {
                    Icon(
                        painter = painterResource(id = R.drawable.ic_menu), // Replace with menu icon
                        contentDescription = "Menu",
                        tint = darkText
                    )
                }
            }

            Spacer(modifier = Modifier.height(24.dp))

            // Banner
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(200.dp)
                    .clip(RoundedCornerShape(16.dp))
                    .shadow(4.dp, RoundedCornerShape(16.dp)),
                colors = CardDefaults.cardColors(containerColor = pastelBlue)
            ) {
                Image(
                    painter = painterResource(id = R.drawable.banner),
                    contentDescription = "Banner",
                    modifier = Modifier.fillMaxSize()
                )
            }

            Spacer(modifier = Modifier.height(32.dp))

            // Quick action buttons
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp),
                horizontalArrangement = Arrangement.SpaceEvenly
            ) {
                QuickActionButton(
                    text = "Đặt lịch",
                    icon = R.drawable.ic_appointment, // Replace with appointment icon
                    onClick = { navController.navigate("appointment-list") },
                    backgroundColor = pastelGreen,
                    textColor = darkText,
                    iconTint = darkText
                )
                QuickActionButton(
                    text = "Hồ sơ",
                    icon = R.drawable.ic_medical, // Replace with medical icon
                    onClick = { navController.navigate("medical-record") },
                    backgroundColor = pastelGreen,
                    textColor = darkText,
                    iconTint = darkText
                )
            }
        }
    }
}

@Composable
fun MenuItem(
    text: String,
    icon: Int,
    onClick: () -> Unit,
    textColor: Color,
    iconTint: Color
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onClick() }
            .padding(vertical = 12.dp, horizontal = 8.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(
            painter = painterResource(id = icon),
            contentDescription = text,
            tint = iconTint,
            modifier = Modifier.size(24.dp)
        )
        Spacer(modifier = Modifier.width(12.dp))
        Text(
            text = text,
            color = textColor,
            fontSize = 16.sp,
            fontWeight = FontWeight.Medium,
            style = MaterialTheme.typography.bodyLarge
        )
    }
}

@Composable
fun QuickActionButton(
    text: String,
    icon: Int,
    onClick: () -> Unit,
    backgroundColor: Color,
    textColor: Color,
    iconTint: Color
) {
    Card(
        modifier = Modifier
            .size(140.dp)
            .shadow(4.dp, RoundedCornerShape(16.dp)),
        colors = CardDefaults.cardColors(containerColor = backgroundColor),
        shape = RoundedCornerShape(16.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .clickable { onClick() }
                .padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            IconButton(
                onClick = onClick,
                modifier = Modifier
                    .size(48.dp)
                    .background(Color.White.copy(alpha = 0.8f), CircleShape)
            ) {
                Icon(
                    painter = painterResource(id = icon),
                    contentDescription = text,
                    tint = iconTint,
                    modifier = Modifier.size(32.dp)
                )
            }
            Spacer(modifier = Modifier.height(12.dp))
            Text(
                text = text,
                color = textColor,
                fontSize = 16.sp,
                fontWeight = FontWeight.SemiBold,
                style = MaterialTheme.typography.titleSmall
            )
        }
    }
}

fun getUserName(context: Context): String {
    val prefs = context.getSharedPreferences("app", Context.MODE_PRIVATE)
    return prefs.getString("hoTen", "Bệnh nhân") ?: "Bệnh nhân"
}