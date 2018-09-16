const path = require('path');

const environments = require('./cfg/environments');

const root = process.cwd();

const config = module.exports = {};

config.root = root;
config.env = environments;

config.server = {
    host: '127.0.0.1',
    port: process.env.PORT || 3030,
    keys: ['popsopop'],
    manifest: path.join(root, 'server/public/manifest.json')
};
