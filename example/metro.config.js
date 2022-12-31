const path = require("path");
const exclusionList = require("metro-config/src/defaults/exclusionList");
const pack = require("../package.json");

const root = path.resolve(__dirname, "..");

const modules = [...Object.keys(pack.peerDependencies)];
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function escape(string) {
    if(typeof string !== "string") {
        throw new TypeError("Expected a string");
    }
    return string
        .replace(/[|\\{}()[\]^$+*?.]/g, "\\$&")
        .replace(/-/g, "\\x2d");
}

module.exports = {
    projectRoot : __dirname,
    watchFolders: [root],

    // We need to make sure that only one version is loaded for peerDependencies
    // So we exclude them at the root, and alias them to the versions in example's node_modules
    resolver : {
        blacklistRE : exclusionList(
            modules.map(
                (m) => new RegExp(`^${escape(path.join(root, "node_modules", m))}\\/.*$`)
            )
        ),

        extraNodeModules : modules.reduce((acc, name) => {
            acc[name] = path.join(__dirname, "node_modules", name);
            return acc;
        }, {})
    },

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