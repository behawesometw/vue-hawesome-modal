module.exports = {
    css: { extract: false },
    productionSourceMap: false,
    assetsDir: 'assets',
    publicPath: process.env.NODE_ENV === 'production'
        ? '/vue-hawesome-modal/'
        : '/'
};