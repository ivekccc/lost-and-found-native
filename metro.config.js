const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const config = getDefaultConfig(__dirname);

// Path to shared library
const apiPackagePath = path.resolve(__dirname, "../lost-and-found-api");

// Watch the shared library folder
config.watchFolders = [apiPackagePath];

// Resolve the shared library
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, "node_modules"),
  path.resolve(apiPackagePath, "node_modules"),
];

module.exports = withNativeWind(config, { input: "./global.css" });
