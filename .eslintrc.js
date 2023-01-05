const { resolve } = require("path");
module.exports = {
    root: true,
    env: {
        browser: true, // Browser global variables like `window` etc.
        commonjs: true, // CommonJS global variables and CommonJS scoping.Allows require, exports and module.
        es6: true, // Enable all ECMAScript 6 features except for modules.
        jest: true, // Jest global variables like `it` etc.
        node: true, // Defines things like process.env when generating through node
        "react-native/react-native": true
    },
    plugins: [
        "import",
        "react",
        "react-native",
        "react-hooks",
        "@typescript-eslint",
        "promise",
        "unused-imports",
        "ts",
        "jest"
    ],
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "@react-native-community",
        "plugin:prettier/recommended"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: "module", // Allows for the use of imports
        ecmaFeatures: {
            jsx: true
        },
        project: [resolve(__dirname, "./tsconfig.json"), resolve(__dirname, "./tsconfig.eslint.json")]
    },
    settings: {
        react: {
            version: "detect"
        }
    },
    globals: {
        _: true,
        $: true
    },
    rules: {
        "jest/globals": "off",
        "prettier/prettier": ["warn"],
        quotes: [
            "off",
            "double",
            {
                avoidEscape: true
            }
        ],
        "import/extensions": [
            "error",
            "never",
            {
                svg: "always",
                model: "always",
                style: "always",
                png: "always",
                jpg: "always",
                json: "always",
                constant: "always"
            }
        ],
        "no-restricted-imports": "off",
        "@typescript-eslint/no-restricted-imports": ["warn", { allowTypeImports: true }],
        "@typescript-eslint/consistent-type-imports": "warn",
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/consistent-type-exports": ["warn", { fixMixedExportsWithInlineTypeSpecifier: true }],
        "import/order": [
            "warn",
            {
                alphabetize: {
                    caseInsensitive: true,
                    order: "asc"
                },
                groups: ["builtin", "external", "index", "sibling", "parent", "internal"]
            }
        ],
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-shadow": ["error"],
        "no-shadow": "off",
        "no-undef": "off",
        "@typescript-eslint/ban-ts-comment": [
            "error",
            {
                "ts-ignore": "allow-with-description"
            }
        ],
        "@typescript-eslint/explicit-function-return-type": "warn",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "react-hooks/exhaustive-deps": "off",
        "no-extend-native": "off",
        "arrow-body-style": "off",
        "prefer-arrow-callback": "off",
        "max-statements-per-line": ["error", { max: 2 }],
        "multiline-ternary": ["off", "always-multiline"],
        "newline-per-chained-call": ["off", { ignoreChainWithDepth: 2 }],
        "no-mixed-spaces-and-tabs": ["off", "smart-tabs"],
        "no-tabs": ["off"],
        "operator-linebreak": ["off", "after"],
        semi: "off",
        "@typescript-eslint/semi": ["off", "always"],
        "yield-star-spacing": ["off", "after"],
        "no-extra-semi": "off",
        "@typescript-eslint/no-extra-semi": "off",
        "semi-spacing": [
            "off",
            {
                before: false,
                after: true
            }
        ],
        "semi-style": ["off", "last"],
        "space-before-blocks": "off",
        "@typescript-eslint/space-before-blocks": "off",
        "no-trailing-spaces": [
            "off",
            {
                ignoreComments: true,
                skipBlankLines: true
            }
        ],
        indent: "off",
        "@typescript-eslint/indent": [
            "off",
            4,
            {
                SwitchCase: 1,
                MemberExpression: 1,
                FunctionDeclaration: { parameters: "first" },
                StaticBlock: { body: 1 },
                CallExpression: { arguments: "first" },
                ArrayExpression: "first",
                ObjectExpression: "first",
                ImportDeclaration: "first",
                flatTernaryExpressions: false
            }
        ],
        "space-infix-ops": "off",
        "@typescript-eslint/space-infix-ops": "off",
        "linebreak-style": ["off", "unix"],
        "comma-dangle": "off",
        "@typescript-eslint/comma-dangle": [
            "off",
            {
                arrays: "always-multiline",
                objects: "always-multiline",
                imports: "never",
                exports: "never",
                functions: "never"
            }
        ],
        "comma-spacing": "off",
        "@typescript-eslint/comma-spacing": [
            "off",
            {
                before: false,
                after: true
            }
        ],
        "comma-style": ["off", "last"],
        "object-property-newline": ["off"],
        "block-spacing": ["off"],
        "arrow-spacing": [
            "off",
            {
                before: true,
                after: true
            }
        ],
        "array-element-newline": ["off", "consistent", { multiline: true }],
        "array-bracket-spacing": [
            "off",
            "always",
            {
                singleValue: false
            }
        ],
        "keyword-spacing": "off",
        "@typescript-eslint/keyword-spacing": [
            "off",
            {
                overrides: {
                    while: { after: false },
                    if: { after: false }
                },
                before: true,
                after: true
            }
        ],
        // "key-spacing" : [
        //     "error",
        //     {
        //         align : {
        //             on          : "colon",
        //             mode        : "strict",
        //             afterColon  : true,
        //             beforeColon : true
        //         },
        //         afterColon  : true,
        //         beforeColon : true
        //     }
        // ],
        "implicit-arrow-linebreak": ["off", "beside"]
    }
};
