import { faker } from "@faker-js/faker";
import * as React from "react";
import { FlatList, Image, Text, View } from "react-native";
import CardComponent from "./component/card";
import Assets from "../src/assets";
import { styles } from "../src/style/main";
import { useCallback } from 'react';
import { cardStyle } from './style/component/card';

interface cardComponentProps {
    id: string;
    profileImage: string;
    title: string;
    subtitle: string;
    status: "read" | "noRead" | "reading";
}
const fakeDataList: cardComponentProps[] = [];
for (let i = 0; i < 100; i++) {
    const fakeData: cardComponentProps = {
        id: faker.random.alphaNumeric(10),
        profileImage: faker.image.animals(640, 480, true),
        title: faker.name.fullName(),
        subtitle: `${faker.animal.dog()} you like that?`,
        status: "noRead"
    };
    fakeDataList.push(fakeData);
}
const renderItem = ({ id, title, subtitle, profileImage, status }: cardComponentProps) => {
    return <CardComponent key={id} profileImg={profileImage} title={title} subtitle={subtitle} status={status} />;
};
function MainHome(): JSX.Element {

    const getItemLayout = useCallback(
        (data, index) => ({
            length: cardStyle.cardContainer.height,
            offset: cardStyle.cardContainer.height * index,
            index,
        }),
        []
    );

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Image style={{ ...styles.iconDefaultSize }} source={Assets.icons.filter} />
                <Text style={styles.title}>Libris</Text>
                <Image style={{ ...styles.iconDefaultSize }} source={Assets.icons.search} />
            </View>
            <View style={styles.cardBodyContainer}>
                <FlatList
                    data={fakeDataList}
                    keyExtractor={(v): string => (v.id)}
                    renderItem={({item}) => {
                        return renderItem(item);
                    }}
                    getItemLayout={getItemLayout}

                />
            </View>
            <View style={styles.bottomContainer}>
                <Image style={{ ...styles.iconDefaultSize }} source={Assets.icons.library} />
                <Image style={{ ...styles.iconDefaultSize }} source={Assets.icons.plush} />
                <Image style={{ ...styles.iconDefaultSize }} source={Assets.icons.settings} />
            </View>
        </View>
    );
}

export default MainHome;
