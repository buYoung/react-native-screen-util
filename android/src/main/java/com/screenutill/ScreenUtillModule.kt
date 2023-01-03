package com.screenutill


import android.app.Activity
import android.content.Context
import android.content.ContextWrapper
import android.os.Build
import android.os.Bundle
import android.util.DisplayMetrics
import android.view.WindowInsets
import android.util.Log
import android.view.*
import androidx.compose.foundation.layout.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.ComposableOpenTarget
import androidx.compose.runtime.ComposableTarget
import androidx.compose.ui.viewinterop.AndroidView
import com.facebook.react.ReactActivity
import com.facebook.react.bridge.*
import com.facebook.react.uimanager.PixelUtil
import kotlinx.coroutines.*


class ScreenUtillModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private lateinit var insetWokrer: Job
    private lateinit var currentActivity: ReactActivity
    private lateinit var currentWindow: Window
    private lateinit var currentWindowManager: WindowManager
    private lateinit var currentRootView: View
    private var rootViewPaddingList: Map<String, androidx.compose.foundation.layout.WindowInsets> = mapOf()
    override fun getName(): String {

        return NAME
    }

    override fun getConstants(): Map<String, Double> {
        val TAG = "buyong!"
        Log.d(TAG, "getConstants: 1")
        CoroutineScope(Dispatchers.IO).launch {
            while (true) {
                delay(500)
                Log.d(TAG, "getConstants: 2")
                val activity = reactApplicationContext.currentActivity
                if (activity == null) {
                    continue
                } else {
                    currentActivity = activity as ReactActivity
                }
                val window = activity.window
                if (window == null) {
                    continue
                } else {
                    currentWindowManager = currentActivity.windowManager
                    currentWindow = currentActivity.window
                }
                Log.d(TAG, "getConstants: 3")
                currentRootView = currentWindow.decorView
                break
            }
        }.start()
        Log.d(TAG, "getConstants: 3")
        CoroutineScope(Dispatchers.Main).launch {
            while (true){
                delay(500)
                Log.d(TAG, "getConstants: 4")
                Log.d(NAME, "initialize: getPaddingInit Start")
                val getPadding = getRootViewInsets().onCreate(reactApplicationContext)

                val waitPaddingInit = async(Dispatchers.IO) { getPadding.getInitialize() }
                waitPaddingInit.join()
                Log.d(NAME, "initialize: getPadding End")
                Log.d(NAME, "initialize: ${getRootViewInsets.rootViewPaddingList}")
                break
            }
            Log.d(TAG, "getConstants: 5")
        }
        Log.d(TAG, "getConstants: 6")
        return _getSafeAreaInsets()
    }


    fun Context.findActivity(): Activity? = when (this) {
        is Activity -> this
        is ContextWrapper -> baseContext.findActivity()
        else -> null
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
        val manager = activity.windowManager
        val view = window.decorView
        Log.d(NAME, "scale Y: ${view.scaleY} ${view.rootView.scaleY}")

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
        Log.d(NAME, "_getSafeAreaInsets0: $displayMatrix")
        Log.d(NAME, "_getSafeAreaInsets1: $rootWindowInsets")
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            val metrics: WindowMetrics = manager.currentWindowMetrics
            val windowInsets = metrics.windowInsets
            val ignoreInsets = windowInsets.getInsetsIgnoringVisibility (
                WindowInsets.Type.navigationBars() or WindowInsets.Type.statusBars()
                    or WindowInsets.Type.displayCutout() or WindowInsets.Type.systemBars()
            )
//            val insetsWidth: Int = ignoreInsets.right + ignoreInsets.left
//            val insetsHeight: Int = ignoreInsets.top + ignoreInsets.bottom
//            val bounds = metrics.bounds
//            Log.d(NAME, "_getSafeAreaInsets: $bounds")
//            val legacySize = android.util.Size(bounds.width() - insetsWidth, bounds.height() - insetsHeight)
            safeareaInsets["top"] = ignoreInsets.top.toDouble()
            safeareaInsets["bottom"] = ignoreInsets.bottom.toDouble()
            safeareaInsets["left"] = ignoreInsets.left.toDouble()
            safeareaInsets["right"] = ignoreInsets.right.toDouble()
        } else {
            val insets = rootWindowInsets
            val outMetrics = DisplayMetrics()
            @Suppress("DEPRECATION")
            val display = activity.windowManager.defaultDisplay
            @Suppress("DEPRECATION")
            display.getMetrics(outMetrics)
            Log.d(NAME, "R aborve: $outMetrics")
            safeareaInsets["top"] = PixelUtil.toDIPFromPixel(insets.systemWindowInsetTop.toFloat()).toDouble()
            safeareaInsets["bottom"] = PixelUtil.toDIPFromPixel(insets.systemWindowInsetBottom.toFloat()).toDouble()
            safeareaInsets["left"] = PixelUtil.toDIPFromPixel(insets.systemWindowInsetLeft.toFloat()).toDouble()
            safeareaInsets["right"] = PixelUtil.toDIPFromPixel(insets.systemWindowInsetRight.toFloat()).toDouble()
        }

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
