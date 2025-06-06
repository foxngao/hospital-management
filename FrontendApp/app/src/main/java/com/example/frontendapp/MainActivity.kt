package com.example.frontendapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.navigation.compose.rememberNavController
import com.example.frontendapp.ui.navigation.AppNavGraph
import com.example.frontendapp.ui.theme.FrontendAppTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            FrontendAppTheme {
                val navController = rememberNavController()
                AppNavGraph(navController)
            }
        }
    }
}
