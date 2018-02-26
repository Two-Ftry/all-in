var fs = require('fs');
const express = require('express');
const compression = require('compression')
const resolve = file => path.resolve(__dirname, file)
const path = require('path')
const favicon = require('serve-favicon');
const appConfig = require('./config/');

const log4js = require('log4js');
const { logger, httpLogger } = require('./nodejs/logger');

const isProd = process.env.NODE_ENV === 'production'

const { createBundleRenderer } = require('vue-server-renderer')

const app = express();
const serve = (path, cache) => express.static(resolve(path), {
    maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
});

// const router = new express.Router();

// 访问日志
app.use(log4js.connectLogger(httpLogger, { level: 'auto' }));

app.use(compression({ threshold: 0 }));
app.use(favicon('./public/logo-48.png'));
// app.use(`/${appConfig.name}`, router);

// router.use('/dist', serve('./dist', true));
// router.use('/public', serve('./public', true));
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
        if (bundle && clientManifest) {
            renderer = createBundleRenderer(bundle, {
                template,
                clientManifest
            })
        } else {
            renderer = null;
            console.warn('bundle, clientManifest one of them is null~~')
        }
    });
}

app.get('*', (req, res) => {
    const context = {
        url: req.url
    }
    logger.info('新请求到来：%s', req.url);
    if (!renderer) {
        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
        res.end('正在编译...如果你在开发过程中，看看控制台eslint是否有报错');
        return;
    }
    renderer.renderToString(context, (err, html) => {
        if (err) {
            logger.error('渲染错误 %s', JSON.stringify(err));
            res.end('error happen', err);
            throw err;
        }
        logger.info('请求结束：%s', req.url);
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end(html);
    })
})

const port = 3004;
app.listen(port, () => {
    console.log(`server started at localhost:${port}`)
})
