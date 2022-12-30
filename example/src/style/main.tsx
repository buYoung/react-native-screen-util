import type { ImageStyle, TextStyle, ViewStyle } from "react-native";
import { InteractionManager, Platform, StyleSheet } from "react-native";
import "react-native-screen-utill";
import { ScreenResponsiveStore } from "react-native-screen-utill";

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
    console.log("get State");
    await ScreenResponsiveStore.getState().getInitialize();
    console.log("get State22");
    console.log("getSafeArea", ScreenResponsiveStore.getState().getSafeArea());
    styles = setStyleResponsive();
});
let styles = setStyleResponsive();

function setStyleResponsive():mainStyle {
    const fixedWidth = (390).w();
    let topInset = Platform.select({
        android: 0,
        ios    : ScreenResponsiveStore.getState().getSafeArea()?.top
    });
    if(!topInset) {
        topInset = 0;
    }
    console.log(topInset);
    return StyleSheet.create<mainStyle>({
        container : {
            width          : fixedWidth,
            height         : (750).h(),
            top            : topInset.h(),
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