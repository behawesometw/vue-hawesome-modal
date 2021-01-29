const pkg = require('./package.json');
process.env.VUE_APP_TITLE = `${pkg.name} - ${pkg.description}`
process.env.VUE_APP_DESC = `${pkg.description}`

const isOnProduction = process.env.NODE_ENV === 'production'

const pages
    = isOnProduction
        ? {
            index: {
                entry: './packages/demo/demoEntry.js',
                template: './packages/demo/public/index.html'
            }
        }
        : undefined;

const chainWebpack
    = isOnProduction
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
    css: { extract: true }, // import vuetify CSS if you need
    productionSourceMap: false,
    assetsDir: 'assets',
    publicPath: isOnProduction
        ? '/vue-hawesome-modal/'
        : '/',
};