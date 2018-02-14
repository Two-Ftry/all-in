const webpack = require('webpack');
const MFS = require('memory-fs');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const chokidar = require('chokidar');
const fs = require('fs');

const serverConfig = require('./webpack.config.server.js');
const clientConfig = require('./webpack.config.client.js');

module.exports = setupDevServer = (app, templatePath, cb) => {

    let bundle = null;
    let clientManifest = null;
    let template = fs.readFileSync(templatePath, 'utf-8');

    // 模版更新
    chokidar.watch(templatePath).on('change',() => {
        template = fs.readFileSync(templatePath, 'utf-8')
        cb(bundle, clientManifest, template);
        console.log('tempate updated~~~')
    })

    // 客户端更新
    const clientCompiler = webpack(clientConfig);
    const devMiddleware = webpackDevMiddleware(clientCompiler, {
        publicPath: clientConfig.output.publicPath
    });
    app.use(devMiddleware);
    clientCompiler.plugin('done', (stats) => {
        const fs = devMiddleware.fileSystem;
        const dir = path.resolve(__dirname, '../dist');
        clientManifest = JSON.parse(fs.readFileSync(path.join(dir, 'vue-ssr-client-manifest.json')));
        cb(bundle, clientManifest, template);
        console.log('client compiled success~~');
    });

    // 服务端更新
    const serverCompiler = webpack(serverConfig);
    const mfs = new MFS();
    serverCompiler.outputFileSystem = mfs;
    serverCompiler.watch({}, (err, stats) => {
        if (err) {
            console.error(err);
            return;
        }
        const dir = path.resolve(__dirname, '../dist');
        bundle = JSON.parse(mfs.readFileSync(path.join(dir, 'vue-ssr-server-bundle.json')));
        cb(bundle, clientManifest, template);
        console.log('server compiled success~~');
    })


};