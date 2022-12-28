const path = require("path");

const root = path.resolve(__dirname, "..");

module.exports = {
    projectRoot : __dirname,
    watchFolders: [root],

    transformer : {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        getTransformOptions : async () => ({
            transform : {
                experimentalImportSupport: false,
                inlineRequires           : true
            }
        })
    }
};
