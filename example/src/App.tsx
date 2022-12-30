import * as React from "react";
import { useEffect, useState } from "react";
import { View, Text, Image, Dimensions, ActivityIndicator } from "react-native";
import "react-native-screen-utill";
import { ResponsiveContext, ScreenResponsiveStore } from "react-native-screen-utill";
import Assets from "./assets";
// import { loadingStyleSheet } from "./style/loading";
// import { loadingStyleSheet } from "./style/loading";
import { styles } from "./style/main";

export default function App(): JSX.Element {
    console.log("run!");
    // useResponsiveHook();
    // const [responsiveInit] = ScreenResponsiveStore((state) => [state.setScreenResponsiveInitialize]);
    // const [ startDebug, stopDebug ] = storeDebug((state) => [ state.startDebugResponsive, state.stopDebugResponsive ]);
    // const [ getResponsiveLoading, setResponsiveLoading ] = useState(false);

    useEffect(() => {
        setImmediate(async () => {
            // startDebug();
            // await responsiveInit({
            //     width        : 390,
            //     height       : 844,
            //     safeArea     : true,
            //     minTextSize  : true,
            //     scaleByHeight: false,
            //     screenSize   : Dimensions.get("window")
            // });
            // setResponsiveLoading(true);
        });
        setTimeout(() => {
            console.log("ㄷㅣ버깅 종료");
            // stopDebug();
        }, 20000);
    }, []);

    // if(!getResponsiveLoading) {
    //     return <ActivityIndicator style={loadingStyleSheet.loading}/>;
    // }
    return (
        <ResponsiveContext.Provider value={ScreenResponsiveStore}>
            <View style={styles.container}>
                <View key={"header"} style={styles.titleContainer}>
                    <Image style={{...styles.iconDefaultSize}} source={Assets.icons.filter}/>
                    <Text style={styles.title}>Libris</Text>
                    <Image style={{...styles.iconDefaultSize}} source={Assets.icons.search}/>
                </View>
                <View key={"body"} style={styles.cardBodyContainer} />
                <View key={"bottom"} style={styles.bottomContainer}>
                    <Image style={{...styles.iconDefaultSize}} source={Assets.icons.library}/>
                    <Image style={{...styles.iconDefaultSize}} source={Assets.icons.plush}/>
                    <Image style={{...styles.iconDefaultSize}} source={Assets.icons.settings}/>
                </View>
            </View>
        </ResponsiveContext.Provider>
    );
}
