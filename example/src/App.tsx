import * as React from "react";
import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ScreenUtilInstall } from "react-native-screen-utill";

export default function App(): JSX.Element {

    // const [result, setResult] = React.useState<number | undefined>();
    //
    // React.useEffect(() => {
    //   multiply(3, 7).then(setResult);
    // }, []);

    useEffect(() => {
        ScreenUtilInstall();
    }, []);
    console.log((30).w);
    // console.log((30).w());
    return (
        <View style={styles.container}>
            <Text>Result: </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex          : 1,
        alignItems    : "center",
        justifyContent: "center"
    },
    box : {
        width         : 60,
        height        : 60,
        marginVertical: 20
    }
});
