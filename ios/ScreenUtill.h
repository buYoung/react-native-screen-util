
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNScreenUtillSpec.h"

@interface ScreenUtill : NSObject <NativeScreenUtillSpec>
#else
#import <React/RCTBridgeModule.h>

@interface ScreenUtill : NSObject <RCTBridgeModule>
#endif

@end
