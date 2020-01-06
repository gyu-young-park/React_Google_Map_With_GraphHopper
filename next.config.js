const webpack = require("webpack");
const withCSS = require('@zeit/next-css')
const withSass = require("@zeit/next-sass");
const withImages = require('next-images')

// Initialize doteenv library
require("dotenv").config();


function HACK_removeMinimizeOptionFromCssLoaders(config) {
  console.warn(
    'HACK: Removing `minimize` option from `css-loader` entries in Webpack config',
  );
  config.module.rules.forEach(rule => {
    if (Array.isArray(rule.use)) {
      rule.use.forEach(u => {
        if (u.loader === 'css-loader' && u.options) {
          delete u.options.minimize;
        }
      });
    }
  });
}

module.exports = withCSS(withImages({
  webpack: function(config) {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }
    /**
     * Returns environment variables as an object
     */
    const env = Object.keys(process.env).reduce((acc, curr) => {
      acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
      return acc;
    }, {});

    /** Allows you to create global constants which can be configured
    * at compile time, which in our case is our environment variables
    */
    config.plugins.push(new webpack.DefinePlugin(env));
    HACK_removeMinimizeOptionFromCssLoaders(config)
    return config
  }
}))
