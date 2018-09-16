module.exports = {
    clean: {
        dest: './server/public/*',
        assets: './server/public/assets/',
        withoutHash: ['./server/public/assets/css', './server/public/assets/js'],
        revisions: './server/public/revisions/',
        move: 'server/public/revisions/assets/'
    },

    svgSprite: {
        src: './client/img/svg-sprite/**/*.svg',
        dest: './server/public/assets/img/'
    },

    img: {
        src: ['./client/img/!(base64|svg-sprite|png-sprite)', './client/img/!(base64|svg-sprite|png-sprite)/**/*.*'],
        dest: './server/public/assets/img/'
    },

    fonts: {
        src: ['./client/fonts/**/*.woff2', './client/fonts/**/*.woff'],
        dest: './server/public/assets/fonts/'
    },

    css: {
        src: './client/css/*.styl',
        dest: './server/public/assets/css/'
    },

    html: {
        src: './client/html/*.pug',
        dest: './server/public/'
    },

    templates: {
        src: './client/html/**/*.pug',
        dest: './server/handlers/site-pages.resolved/templates/'
    },

    static: {
        src: ['./robots.txt', './sitemap.xml', 'favicon.ico', 'favicon64.png'],
        dest: './server/public/'
    },

    revisions: {
        src: './server/public/**/*.{js,css}',
        dest: './server/public/revisions/',
        manifest: './server/public/'
    },

    watch: {
        css: './client/css/**/*.styl',
        html: './client/html/**/*.pug',
        svgSprite: './client/img/svg-sprite/**/*.svg'
    }

};
