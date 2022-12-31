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
    cardContainer: ViewStyle,
    cardLeftProfileIcon: ImageStyle,
    cardTextContainer: ViewStyle
    cardTitle: TextStyle,
    cardSubject: TextStyle,
    cardMaker: TextStyle,
    bottomContainer: ViewStyle
};


const styles = ResponsiveStyleSheet.create<mainStyle>({
    container : {
        width          : 390,
        height         : 750,
        backgroundColor: "#777"
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
        backgroundColor            : "#FFFFFF",
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
        // color: "#F8F7FC"
    },
    cardContainer : {
        width : 390,
        height: 100,
        color : "#F8F7FC"
    },
    cardLeftProfileIcon : {
        marginLeft : 15,
        marginRight: 30,
        width      : 70,
        height     : 70
    },
    cardTextContainer : {
        marginTop     : 15,
        marginBottom  : 15,
        display       : "flex",
        flexDirection : "row",
        alignItems    : "flex-start",
        alignContent  : "flex-start",
        justifyContent: "space-between"
    },
    cardTitle : {
        color     : "#000000",
        fontWeight: "700",
        fontSize  : 12
    },
    cardSubject : {
        color     : "#AAAAAA",
        fontWeight: "600",
        fontSize  : 12
    },
    cardMaker : {
        color     : "#26B888",
        fontWeight: "400",
        fontSize  : 12
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


export {
    styles
};