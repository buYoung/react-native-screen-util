package com.screenutill

import android.os.Build
import android.util.Log
import android.view.*
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.facebook.react.bridge.*
import com.facebook.react.uimanager.PixelUtil

class ScreenUtillModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {
    private var currentWindowInsets: WindowInsetsCompat = WindowInsetsCompat.Builder().build()
    private val currentInsetTypes = mutableSetOf<Int>()
    override fun getName(): String {
        return NAME
    }

    override fun getConstants(): Map<String, Double> {
        return this._getSafeAreaInsets()
    }

    private fun _getSafeAreaInsets(): Map<String, Double> {
        val safeareaInsets: HashMap<String, Double> = hashMapOf<String, Double>(
            "top" to 0.0,
            "bottom" to 0.0,
            "left" to 0.0,
            "right" to 0.0,
        )
        val activity = reactApplicationContext.currentActivity
        if(activity == null) {
            Log.d(NAME, "_getSafeAreaInsets: Error No activity...")
            return safeareaInsets
        }
        val window = activity.window

        val view = window.decorView

        if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.M) {
            Log.d(NAME, "_getSafeAreaInsets: support Only Android Version 29 Higher!")
            return safeareaInsets
        }

        val rootWindowInsets = view.rootWindowInsets
        if(rootWindowInsets == null) {
            Log.d(NAME, "_getSafeAreaInsets: rootWindowInsets is Null")
            return safeareaInsets
        }
        val displayMatrix = reactApplicationContext.resources.displayMetrics
        if(displayMatrix == null) {
            Log.d(NAME, "_getSafeAreaInsets: displayMatrix is null")
            return safeareaInsets
        }
        val density = displayMatrix.density.toDouble()
        val insets = rootWindowInsets
        Log.d(NAME, "_getSafeAreaInsets: ${displayMatrix}")
        Log.d(NAME, "_getSafeAreaInsets: ${rootWindowInsets}")

        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {

            val statusBar = insets.getInsets(WindowInsets.Type.statusBars())
            val navigationBars = insets.getInsets(WindowInsets.Type.navigationBars())
            safeareaInsets["top"] = statusBar.top.div(density)
            safeareaInsets["bottom"] = navigationBars.bottom.div(density)
            safeareaInsets["left"] = statusBar.top.div(density)
            safeareaInsets["right"] = navigationBars.bottom.div(density)
        } else {
            safeareaInsets["top"] = PixelUtil.toDIPFromPixel(insets.systemWindowInsetTop.toFloat()).toDouble()
            safeareaInsets["bottom"] = PixelUtil.toDIPFromPixel(insets.systemWindowInsetBottom.toFloat()).toDouble()
            safeareaInsets["left"] = PixelUtil.toDIPFromPixel(insets.systemWindowInsetLeft.toFloat()).toDouble()
            safeareaInsets["right"] = PixelUtil.toDIPFromPixel(insets.systemWindowInsetRight.toFloat()).toDouble()
        }
//        Log.d(NAME, "_getSafeAreaInsets: $insets")
//        Log.d(NAME, "_getSafeAreaInsets: $isFullScreen")
        return safeareaInsets
    }
    private fun _getIsFullScreen(window: Window, view: View):Boolean {
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            val insetController = view.windowInsetsController ?: return false
            return insetController.systemBarsBehavior == WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
        } else {
            return (window.attributes.flags and WindowManager.LayoutParams.FLAG_FULLSCREEN) != 0
        }
    }

    @ReactMethod(isBlockingSynchronousMethod = false)
    fun getSafeAreaInsets(cb: Callback) {
        try {

            val getSafeArea = _getSafeAreaInsets()
            val resultObject: WritableMap = WritableNativeMap()
            for (entry in getSafeArea) {
                resultObject.putDouble(entry.key, entry.value)
            }
            Log.d(NAME, "getSafeAreaInsets: Callback! result $getSafeArea")
            cb.invoke(resultObject)
        } catch (e:java.lang.Exception) {
            Log.d(NAME, "getSafeAreaInsets: Error $e")
            cb.invoke(e)
        }
    }
    companion object {
        const val NAME = "ScreenUtill"
    }
}
