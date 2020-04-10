const pkg = require('./package.json');
process.env.VUE_APP_TITLE = `${pkg.name} - ${pkg.description}`

module.exports = {
    css: { extract: false },
    productionSourceMap: false,
    assetsDir: 'assets',
    publicPath: process.env.NODE_ENV === 'production'
        ? '/vue-hawesome-modal/'
        : '/'
};