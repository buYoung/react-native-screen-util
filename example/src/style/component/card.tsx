import type { ImageStyle, TextStyle, ViewStyle } from "react-native";
import "react-native-screen-util";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import screenUtil, { ResponsiveStore, ResponsiveStyleSheet } from "react-native-screen-util";


type cardStyle = {
    cardContainer: ViewStyle,
    cardLeftProfileContainer: ViewStyle,
    cardLeftProfileIcon: ImageStyle,
    cardTextContainer: ViewStyle
    cardTitle: TextStyle,
    cardSubject: TextStyle,
    cardMaker: TextStyle,
};


const cardStyle = ResponsiveStyleSheet.create<cardStyle>({
    cardContainer : {
        width        : 390,
        height       : 100,
        flexDirection: "row",
        color        : "#F8F7FC"
    },
    cardLeftProfileContainer : {
        margin        : 15,
        height        : 100,
        alignContent  : "center",
        alignItems    : "center",
        justifyContent: "center"
    },
    cardLeftProfileIcon : {
        marginLeft     : 15,
        marginRight    : 15,
        width          : 70,
        height         : 70,
        backgroundColor: "#aaa",
        borderRadius   : 35
    },
    cardTextContainer : {
        marginTop     : 15,
        marginBottom  : 15,
        display       : "flex",
        flexDirection : "column",
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
    }
});

export {
    cardStyle
};