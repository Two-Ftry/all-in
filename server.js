var http = require('http');
var Vue = require('vue');
var fs = require('fs');
const express = require('express');
const resolve = file => path.resolve(__dirname, file)
const path = require('path')
const favicon = require('serve-favicon')

const isProd = process.env.NODE_ENV === 'production'

const { createBundleRenderer } = require('vue-server-renderer')

const app = express();
const serve = (path, cache) => express.static(resolve(path), {
    maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
  });

app.use(favicon('./public/logo-48.png'))
app.use('/dist', serve('./dist', true));
app.use('/public', serve('./public', true));

let renderer = null;

if (isProd) {
    const clientManifest = require('./dist/vue-ssr-client-manifest.json');
    renderer = createBundleRenderer(require('./dist/vue-ssr-server-bundle.json'), {
        template: fs.readFileSync('./index.template.html', 'utf-8'),
        clientManifest
    })
} else {
    const setupDevServer = require('./build/setup-dev-server');
    const templatePath = path.resolve(__dirname, './src/index.template.html');
    setupDevServer(app, templatePath, (bundle, clientManifest, template) => {
        renderer = createBundleRenderer(bundle, {
            // template: fs.readFileSync('./index.template.html', 'utf-8'),
            template,
            clientManifest
        })
    });
}

app.get('*', (req, res) => {
    const context = {
        url: req.url
    }
    if (!renderer) {
        res.end('正在编译...');
        return;
    }
    renderer.renderToString(context, (err, html) => {
        if (err) {
            res.end('error happen', err);
            throw err;
        }
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end(html);
    })
})

const port = 3000;
app.listen(port, () => {
    console.log(`server started at localhost:${port}`)
})
