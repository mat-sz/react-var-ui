const postcss = require('rollup-plugin-postcss');
const cssnano = require('cssnano');

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        plugins: [
          cssnano({
            preset: 'default'
          })
        ],
        inject: false,
        // only write out CSS for the first bundle (avoids pointless extra files):
        extract: !!options.writeMeta && 'index.css'
      })
    );
    return config;
  }
};
