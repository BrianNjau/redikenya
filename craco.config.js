const { whenProd } = require("@craco/craco");
const Critters = require("critters-webpack-plugin");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Check if the webpackConfig.resolve object exists, if not, create it
      webpackConfig.resolve = webpackConfig.resolve || {};

      // Add fallback for the 'stream' module
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        stream: require.resolve("stream-browserify"),
      };

      return {
        ...webpackConfig,
        plugins: [
          ...webpackConfig.plugins,
          ...whenProd(
            () => [
              new Critters({
                preload: "swap",
                preloadFonts: false,
              }),
            ],
            []
          ),
        ],
      };
    },
  },
};
