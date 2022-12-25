import type { ImageStyle, TextStyle, ViewStyle } from "react-native";
import { InteractionManager, StyleSheet } from "react-native";
import "react-native-screen-utill";
import { initializePromise } from "react-native-screen-utill";

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

InteractionManager.runAfterInteractions(async () => {
    await initializePromise();
    styles = setStyleResponsive();
});
let styles = setStyleResponsive();

function setStyleResponsive():mainStyle {
    const fixedWidth = (390).w();
    return StyleSheet.create<mainStyle>({
        container : {
            width          : fixedWidth,
            height         : (750).h(),
            backgroundColor: "#777"
            // backgroundColor: "#F8F7FC"
        },
        iconDefaultSize : {
            width : (16).w(),
            height: (16).h()
        },
        titleContainer : {
            width            : fixedWidth,
            height           : (60).h(),
            paddingHorizontal: (16).pl(),
            backgroundColor            : "#FFFFFF",
            flexDirection    :  "row",
            alignItems       : "center",
            alignContent     : "center",
            justifyContent   : "space-between"
        },
        title : {
            fontSize  : (24).sp(),
            color     : "#754cc4",
            fontWeight: "600"
        },
        cardBodyContainer : {
            width          : fixedWidth,
            height         : (630).h(),
            backgroundColor: "#333"
            // color: "#F8F7FC"
        },
        cardContainer : {
            width : fixedWidth,
            height: (100).h(),
            color : "#F8F7FC"
        },
        cardLeftProfileIcon : {
            marginLeft : (15).ml(),
            marginRight: (30).mr(),
            width      : (70).w(),
            height     : (70).h()
        },
        cardTextContainer : {
            marginTop     : (15).mt(),
            marginBottom  : (15).mb(),
            display       : "flex",
            flexDirection : "row",
            alignItems    : "flex-start",
            alignContent  : "flex-start",
            justifyContent: "space-between"
        },
        cardTitle : {
            color     : "#000000",
            fontWeight: "700",
            fontSize  : (12).sp()
        },
        cardSubject : {
            color     : "#AAAAAA",
            fontWeight: "600",
            fontSize  : (12).sp()
        },
        cardMaker : {
            color     : "#26B888",
            fontWeight: "400",
            fontSize  : (12).sp()
        },
        bottomContainer : {
            width            : fixedWidth,
            height           : (60).h(),
            paddingHorizontal: (16).pl(),
            backgroundColor            : "#FFFFFF",
            flexDirection    :  "row",
            alignItems       : "center",
            alignContent     : "center",
            justifyContent   : "space-between"
        }
    });
}
export {
    styles
};