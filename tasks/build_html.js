const gulp   = require('gulp');
const pug    = require('gulp-pug');
const gulpIf = require('gulp-if');
const notify = require('gulp-notify');
const config = require('config');

const isWatch  = config.get('env.isWatch');


module.exports = function(options) {
    const src     = config.get('gulp.tasks.html.src');
    const dest    = config.get('gulp.tasks.html.dest');
    const plugins = config.get('gulp.plugins');
    const bsync   = options && options.sync;

    return function() {
        return gulp.src(src)
            .pipe(pug(plugins.pug))
            .on('error', notify.onError({ title: 'html task' }))
            .pipe(gulp.dest(dest))
            .pipe(gulpIf(isWatch, bsync.reload({ stream: true })));
    };

};
