module.exports = {
    presets: ["module:metro-react-native-babel-preset"],
    plugins: [
        [
            "module-resolver",
            {
                extensions : [
                    ".ios.ts",
                    ".android.ts",
                    ".ts",
                    ".ios.tsx",
                    ".android.tsx",
                    ".tsx",
                    ".jsx",
                    ".js",
                    ".json"
                ],
                root      : ["./src"],
                alias: {
                    "src"  : ["./src/index"],
                    "type" : ["./src/type"],
                    "typed": ["./src/type"]
                }
            }
        ]
    ]
};
