module.exports = {
    assetsDir: 'assets',
    publicPath: process.env.NODE_ENV === 'production'
        ? '/hawesome-vue-extends/'
        : '/',
};