const gulp   = require('gulp');
const config = require('config');


module.exports = function() {
    const src  = config.get('gulp.tasks.templates.src');
    const dest = config.get('gulp.tasks.templates.dest');

    return function() {
        return gulp.src(src)
            .pipe(gulp.dest(dest));
    };
};
