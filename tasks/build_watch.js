const gulp   = require('gulp');
const config = require('config');

const paths  = config.get('gulp.tasks.watch')


module.exports = function(options) {
    return gulp.series(
        'build:base',

        gulp.parallel(function(done) {
            gulp.watch(paths.css, gulp.parallel('build:css'));
            gulp.watch(paths.html, gulp.parallel('build:html'));
            gulp.watch(paths.svgSprite, gulp.parallel('build:sprite:svg'));
            done();
        },

        'build:bsync'
    ));
};
