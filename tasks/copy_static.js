const gulp   = require('gulp');
const config = require('config');


module.exports = function() {
    const src  = config.get('gulp.tasks.static.src');
    const dest = config.get('gulp.tasks.static.dest');

    return function() {
        return gulp.src(src)
            .pipe(gulp.dest(dest));
    };

};
