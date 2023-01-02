import { Text, View } from "react-native";
import { cardStyle } from "../style/component/card";
import * as React from "react";
import shallow from "zustand/shallow";

export type CardProps = {
    profileImg: string,
    title: string,
    subtitle: string,
    status: "read" | "noRead" | "reading"
};

function CardComponent(props: CardProps): JSX.Element {
    console.log("CardComponent", props);
    return (
        <View style={cardStyle.cardContainer}>
            <View style={cardStyle.cardLeftProfileContainer}>
                <Text style={cardStyle.cardLeftProfileIcon}>
                    프로필 자리
                </Text>
            </View>
            <View style={cardStyle.cardTextContainer}>
                <Text>
                    내자리야
                </Text>
                <Text>
                    내자리야
                </Text>
                <Text>
                    내자리야
                </Text>
            </View>
        </View>
    );
}

export default React.memo(CardComponent, shallow);