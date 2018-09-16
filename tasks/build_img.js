const gulp     = require('gulp');
const imagemin = require('gulp-imagemin');
const changed  = require('gulp-changed');
const config   = require('config');


module.exports = function() {
    const src     = config.get('gulp.tasks.img.src');
    const dest    = config.get('gulp.tasks.img.dest');
    const plugins = config.get('gulp.plugins');

    return function() {
        return gulp.src(src, { since: gulp.lastRun('build:img') })
            .pipe(changed(dest))
            .pipe(imagemin(plugins.imagemin))
            .pipe(gulp.dest(dest));
    };

};
