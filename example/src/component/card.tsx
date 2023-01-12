import * as React from "react";
import { Image, Text, View } from "react-native";
import { cardStyle } from "../style/component/card";

export type CardProps = {
    profileImg: string;
    title: string;
    subtitle: string;
    status: "read" | "noRead" | "reading";
};

function CardComponent(props: CardProps): JSX.Element {
    return (
        <View style={cardStyle.cardContainer}>
            <View style={cardStyle.cardLeftProfileContainer}>
                <Image style={cardStyle.cardLeftProfileIcon} source={{ uri: props.profileImg }} />
            </View>
            <View style={cardStyle.cardTextContainer}>
                <Text style={cardStyle.cardTitle}>{props.title}</Text>
                <Text style={cardStyle.cardSubject}>{props.subtitle}</Text>
                <Text style={cardStyle.cardMaker}>{props.status}</Text>
            </View>
        </View>
    );
}

export default CardComponent;
