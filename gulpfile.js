const { task, src, dest, series } = require('gulp');
const del = require("del");

task('moving-ts-file', () => {
    return src('packages/vue-hawesome-modal/index.d.ts').pipe(dest('./', { overwrite: true }))
});

task('moving-component-libs', () => {
    return src('packages/vue-hawesome-modal/lib/**').pipe(dest('libs/'), { overwrite: true })
});

task('delete-lib-autogen-html', () => {
    return del("dist/demo.html")
});

task('default', series('moving-ts-file', 'moving-component-libs', 'delete-lib-autogen-html'));