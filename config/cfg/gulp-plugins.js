const isDeploy = require('./environments').isDeploy;


module.exports = function(root) {

    return {
        autoprefixer: {
            browsers: ['last 2 versions', 'Firefox ESR', 'ie >= 9']
        },

        browserSync: {
            server: {
                baseDir: 'server/public/',
                index: 'index.html'
            },
            ghostMode: false,
            ui: false,
            notify: false,
            open: false
        },

        stylus: {
            compress: isDeploy
        },

        spriteSvg: {
            mode: {
                symbol: {
                    dest: './',
                    bust: false,
                    sprite: 'sprite.svg'
                }
            },
            shape: {
                spacing: {
                    box: 'padding'
                }
            }
        },

        imagemin: {
            progressive: true
        },

        pug: {
            pretty: true,
            locals: {
                bundle: function(p) {
                    return p;
                }
            }
        },

        revAll: {
            fileNameManifest: 'manifest.json'
        },

        webpackOutput: {
            hash: true,
            version: false,
            timings: true,
            assets: true,
            chunks: false,
            chunkModules: false,
            children: false,
            reasons: false,
            source: false,
            errorDetails: true,
            chunkOrigins: false,
            modules: true,
            cached: true,
            colors: true
        }
    };

};
