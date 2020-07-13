const pkg = require('./package.json');
process.env.VUE_APP_TITLE = `${pkg.name} - ${pkg.description}`

const pages
    = process.env.NODE_ENV === 'production'
        ? {
            index: {
                entry: './packages/demo/demoEntry.js',
                template: './packages/demo/public/index.html'
            }
        }
        : undefined;

const chainWebpack
    = process.env.NODE_ENV === 'production'
        ? undefined
        : config => {
            config
                .plugin('html')
                .tap(args => {
                    args[0].template = './packages/demo/public/index.html'
                    return args
                })
        }

module.exports = {
    pages,
    chainWebpack,
    css: { extract: false },
    productionSourceMap: false,
    assetsDir: 'assets',
    publicPath: process.env.NODE_ENV === 'production'
        ? '/vue-hawesome-modal/'
        : '/',
};