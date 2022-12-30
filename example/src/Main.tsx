import * as React from "react";
import { Image, Text, View } from "react-native";
import Assets from "../src/assets";
import { styles } from "../src/style/main";

function MainHome(): JSX.Element {
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

export default MainHome;