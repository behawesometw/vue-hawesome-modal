const { task, src, dest, series } = require('gulp');
const del = require("del");

task('moving-ts-file', () => {
    return src('packages/vue-hawesome-modal/index.d.ts').pipe(dest('./', { overwrite: true }))
});

task('moving-component-lib', () => {
    return src('packages/vue-hawesome-modal/lib/**').pipe(dest('lib/'), { overwrite: true })
});

task('delete-lib-autogen-html', () => {
    return del("dist/demo.html")
});

task('default', series('moving-ts-file', 'moving-component-lib', 'delete-lib-autogen-html'));