const gulp   = require('gulp');
const RevAll = require('gulp-rev-all');
const gzip   = require('gulp-gzip');
const config = require('config');


module.exports = function(options) {
    const src      = config.get('gulp.tasks.revisions.src');
    const dest     = config.get('gulp.tasks.revisions.dest');
    const manifest = config.get('gulp.tasks.revisions.manifest');
    const plugins  = config.get('gulp.plugins');

    const revAll = new RevAll(plugins.revAll);

    return function() {
        return gulp.src(src)
            .pipe(revAll.revision())
            .pipe(gzip())
            .pipe(gulp.dest(dest))
            .pipe(revAll.manifestFile())
            .pipe(gulp.dest(manifest));
    };

};
