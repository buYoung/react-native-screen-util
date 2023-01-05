package com.screenutill


import android.app.Activity
import android.os.Build
import android.util.DisplayMetrics
import android.view.WindowInsets
import android.util.Log
import android.view.*
import com.facebook.react.bridge.*
import com.facebook.react.uimanager.PixelUtil
import kotlinx.coroutines.*

class ScreenUtillModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {
    val safeareaInsets: HashMap<String, Double> = hashMapOf(
        "top" to 0.0,
        "bottom" to 0.0,
        "left" to 0.0,
        "right" to 0.0,
    )
    var isInitialized:Boolean = false
    val TAG = "buyong!"
    lateinit var activity: Activity
    lateinit var window: Window
    lateinit var manager: WindowManager
    lateinit var decorView: View
    lateinit var rootView: View

    init {

            CoroutineScope(Dispatchers.IO).launch {
                while (true) {
                    delay(100)
                    activity = reactApplicationContext.currentActivity ?: continue
                    window = activity.window
                    manager = activity.windowManager
                    decorView = window.decorView
                    val decorViewScaleX = decorView.scaleX
                    val decorViewScaleY = decorView.scaleX


                    Log.d(NAME, "scale X: ${decorViewScaleX} ${decorViewScaleY}")

                    val rootWindowInsets = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                        decorView.rootWindowInsets ?: continue
                    } else {
                        null
                    }
                    rootView = decorView.rootView
                    val displayMatrix = reactApplicationContext.resources.displayMetrics ?: continue
                    Log.d(NAME, "_getSafeAreaInsets0: $displayMatrix")
                    Log.d(NAME, "_getSafeAreaInsets1: $rootWindowInsets")
                    Log.d(TAG, "decorView measure:  ${rootView.measure(rootView.measuredWidthAndState, rootView.measuredHeightAndState)}")

                    if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                        val maxMetrics = manager.maximumWindowMetrics
                        val metrics: WindowMetrics = manager.currentWindowMetrics
                        Log.d(TAG, "max maxMetrics: ${maxMetrics.bounds}")
                        Log.d(TAG, "max matrics: ${metrics.bounds}")
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
                        val insets = rootWindowInsets ?: break
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
                        break
                    }
                    isInitialized = true
                    break
                }

        }
    }
    override fun getName(): String {
        return NAME
    }

    @ReactMethod(isBlockingSynchronousMethod = false)
    fun getSafeAreaInsets(cb: Callback) {
        try {
            if (!isInitialized) {
                cb("init")
                return
            }

            val resultObject: WritableMap = WritableNativeMap()
            for (entry in safeareaInsets) {
                resultObject.putDouble(entry.key, entry.value)
            }
            Log.d(NAME, "getSafeAreaInsets: Callback! result $safeareaInsets")
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


