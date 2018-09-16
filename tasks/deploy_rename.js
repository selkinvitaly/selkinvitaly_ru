const del    = require('del');
const ncp    = require('ncp').ncp;
const config = require('config');


module.exports = function(options) {
    const assetsDir    = config.get('gulp.tasks.clean.assets');
    const withoutHash  = config.get('gulp.tasks.clean.withoutHash');
    const revisionsDir = config.get('gulp.tasks.clean.revisions');
    const moveDir      = config.get('gulp.tasks.clean.move');

    return function() {
        return del(withoutHash)
            .then(paths => {
                return new Promise((resolve, reject) => {
                    ncp(moveDir, assetsDir, { clobber: true }, function(err) {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve();
                    });
                });
            })
            .then(() => del(revisionsDir));
    };

};
