import * as React from "react";
import { useEffect, useState } from "react";
import { View, Text, Image, Dimensions, ActivityIndicator } from "react-native";
import "react-native-screen-utill";
import { initializePromise, ScreenUtilInstall } from "react-native-screen-utill";
import Assets from "./assets";
import { loadingStyleSheet } from "./style/loading";
import { styles } from "./style/main";

export default function App(): JSX.Element {
    const [ getResponsiveLoading, setResponsiveLoading ] = useState(false);
    // const [result, setResult] = React.useState<number | undefined>();
    //
    // React.useEffect(() => {
    //   multiply(3, 7).then(setResult);
    // }, []);

    useEffect(() => {
        setImmediate(async () => {
            await ScreenUtilInstall({
                width        : 390,
                height       : 844,
                safeArea     : true,
                minTextSize  : true,
                scaleByHeight: false,
                screenSize   : Dimensions.get("window")
            });
            await initializePromise();
            setResponsiveLoading(true);
        });

    }, []);

    if(!getResponsiveLoading) {
        return <ActivityIndicator style={loadingStyleSheet.loading}/>;
    }
    return (
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
    );
}
