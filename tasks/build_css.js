const stylus  = require('gulp-stylus');
const gulp    = require('gulp');
const postcss = require('gulp-postcss');
const prefix  = require('autoprefixer');
const gulpIf  = require('gulp-if');
const smaps   = require('gulp-sourcemaps');
const notify  = require('gulp-notify');
const config  = require('config');
const log     = require('fancy-log');


module.exports = function(options) {
    const isWatch = config.get('env.isWatch');
    const src     = config.get('gulp.tasks.css.src');
    const dest    = config.get('gulp.tasks.css.dest');
    const plugins = config.get('gulp.plugins');
    const bsync   = options && options.sync;

    const processors = [
        prefix(plugins.autoprefixer)
    ];

    return function() {
        return gulp.src(src)
            .pipe(gulpIf(isWatch, smaps.init()))
            .pipe(stylus(plugins.stylus))
            .on('error', err => {
                log.error(err);
                notify.onError({ title: 'CSS task' });
            })
            .pipe(postcss(processors))
            .pipe(gulpIf(isWatch, smaps.write()))
            .pipe(gulp.dest(dest))
            .pipe(gulpIf(isWatch, bsync.reload({ stream: true })));
    };

};
