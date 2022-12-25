package com.screenutill

import android.annotation.SuppressLint
import android.os.Build
import android.telecom.Call
import android.util.Log
import android.view.View
import android.view.Window
import android.view.WindowInsets
import android.view.WindowInsetsController
import android.view.WindowManager
import androidx.core.view.DisplayCutoutCompat
import com.facebook.common.internal.ImmutableMap
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.uimanager.PixelUtil

class ScreenUtillModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

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
//        val isFullScreen:Boolean = _getIsFullScreen(window, view)
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            val getInsets = insets.getInsets(WindowInsets.Type.systemGestures())
            safeareaInsets["top"] = getInsets.top.div(density)
            safeareaInsets["bottom"] = getInsets.bottom.div(density)
            safeareaInsets["left"] = getInsets.left.div(density)
            safeareaInsets["right"] = getInsets.right.div(density)
        } else {
            safeareaInsets["top"] = PixelUtil.toDIPFromPixel(insets.systemWindowInsetTop.toFloat()).toDouble()
            safeareaInsets["bottom"] = PixelUtil.toDIPFromPixel(insets.systemWindowInsetBottom.toFloat()).toDouble()
            safeareaInsets["left"] = PixelUtil.toDIPFromPixel(insets.systemWindowInsetLeft.toFloat()).toDouble()
            safeareaInsets["right"] = PixelUtil.toDIPFromPixel(insets.systemWindowInsetRight.toFloat()).toDouble()
        }
//        Log.d(NAME, "_getSafeAreaInsets: $insets")
//        Log.d(NAME, "_getSafeAreaInsets: $isFullScreen")
        Log.d(NAME, "_getSafeAreaInsets: $safeareaInsets")
        Log.d(NAME, "_getSafeAreaInsets: ${Build.VERSION.SDK_INT}")
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
