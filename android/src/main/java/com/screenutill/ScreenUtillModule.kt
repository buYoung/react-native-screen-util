package com.screenutill

import android.content.Context
import android.hardware.display.DisplayManager
import android.os.Build
import android.util.DisplayMetrics
import android.view.WindowInsets
import android.util.Log
import android.view.*
import androidx.annotation.Size
import com.facebook.react.bridge.*
import com.facebook.react.uimanager.PixelUtil


class ScreenUtillModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return NAME
    }
//
//    override fun getConstants(): Map<String, Double> {
//        return this._getSafeAreaInsets()
//    }


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
        view.getDimensions { i, i2 ->
            Log.d(name, "getDimensions : $i $i2")
        }

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
        val fontScale = displayMatrix.scaledDensity.toDouble()

        Log.d(NAME, "_getSafeAreaInsets0: ${displayMatrix}")
        Log.d(NAME, "_getSafeAreaInsets1: ${rootWindowInsets}")
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            val metrics: WindowMetrics = manager.currentWindowMetrics
            val windowInsets = metrics.windowInsets
            val ignoreInsets = windowInsets.getInsetsIgnoringVisibility (
                WindowInsets.Type.navigationBars() or WindowInsets.Type.statusBars()
                    or WindowInsets.Type.displayCutout() or WindowInsets.Type.systemBars()
            )
            Log.d(NAME, "_getSafeAreaInsets2: ${windowInsets.displayCutout}")
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                Log.d(NAME, "_getSafeAreaInsets3: ${windowInsets.privacyIndicatorBounds}")
            }
            val insetsWidth: Int = ignoreInsets.right + ignoreInsets.left
            val insetsHeight: Int = ignoreInsets.top + ignoreInsets.bottom
            val bounds = metrics.bounds
            val legacySize = android.util.Size(bounds.width() - insetsWidth, bounds.height() - insetsHeight)
            safeareaInsets["top"] = ignoreInsets.top.toDouble()
            safeareaInsets["bottom"] = ignoreInsets.bottom.toDouble()
            safeareaInsets["left"] = ignoreInsets.left.toDouble()
            safeareaInsets["right"] = ignoreInsets.right.toDouble()
            safeareaInsets["realWidth"] = legacySize.width.toDouble()
            safeareaInsets["realHeight"] = legacySize.height.toDouble()
            safeareaInsets["fontScale"] = fontScale
            safeareaInsets["screenScale"] = density
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
    inline fun View.getDimensions(crossinline onDimensionsReady: (Int, Int) -> Unit) {
        lateinit var layoutListener: ViewTreeObserver.OnGlobalLayoutListener
        layoutListener = ViewTreeObserver.OnGlobalLayoutListener {
            viewTreeObserver.removeOnGlobalLayoutListener(layoutListener)
            Log.d(name, "getDimensions1: $measuredHeight $measuredHeightAndState $minimumHeight")
            Log.d(name, "getDimensions2: $measuredWidth $measuredWidthAndState $minimumWidth")
            Log.d(name, "getDimensions3: $top $bottom $left $right")
            Log.d(name, "getDimensions4: $paddingTop $paddingBottom $paddingLeft $paddingRight $paddingStart $paddingEnd")


            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                Log.d(name, "getDimensions5: $matrix $rootWindowInsets $windowInsetsController")
            }

            onDimensionsReady(width, height)
        }
        viewTreeObserver.addOnGlobalLayoutListener(layoutListener)
    }
    companion object {
        const val NAME = "ScreenUtill"
    }
}
