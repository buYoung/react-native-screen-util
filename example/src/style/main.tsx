import type { ImageStyle, TextStyle, ViewStyle } from "react-native";
import "react-native-screen-util";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import screenUtil, { ResponsiveStore, ResponsiveStyleSheet } from "react-native-screen-util";


type mainStyle = {
    container: ViewStyle,
    iconDefaultSize: ImageStyle,
    titleContainer: ViewStyle,
    title: TextStyle,
    cardBodyContainer: ViewStyle,
    bottomContainer: ViewStyle
};


const styles = ResponsiveStyleSheet.create<mainStyle>({

    container : {
        width          : 390,
        height         : 750,
        backgroundColor: "blue"
        // backgroundColor: "#F8F7FC"
    },
    iconDefaultSize : {
        width : 16,
        height: 16
    },
    titleContainer : {
        width            : 390,
        height           : 60,
        paddingHorizontal: 16,
        backgroundColor  : "#FFFFFF",
        flexDirection    :  "row",
        alignItems       : "center",
        alignContent     : "center",
        justifyContent   : "space-between"
    },
    title : {
        fontSize  : 24,
        color     : "#754cc4",
        fontWeight: "600"
    },
    cardBodyContainer : {
        width          : 390,
        height         : 630,
        backgroundColor: "#333"
    },
    bottomContainer : {
        width            : 390,
        height           : 60,
        paddingHorizontal: 16,
        backgroundColor            : "#FFFFFF",
        flexDirection    :  "row",
        alignItems       : "center",
        alignContent     : "center",
        justifyContent   : "space-between"
    }
});

console.log("mainContainer", styles.container);
export {
    styles
};