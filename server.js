var http = require('http');
// var SSR = require('vue-server-renderer');
var Vue = require('vue');
var fs = require('fs');

// var renderer = SSR.createRenderer('./dist/vue-ssr-server-bundle.js', {
//     // template: fs.readFileSync('./index.template.html', 'utf-8')
// });
const { createBundleRenderer } = require('vue-server-renderer')
const renderer = createBundleRenderer(require('./dist/vue-ssr-server-bundle.json'), {
    template: fs.readFileSync('./index.template.html', 'utf-8')
})

var server = http.createServer((req, res) => {

    // var app = new Vue({
    //     template: '<div>hello vue-ssr</div>'
    // });
    const context = {
        url: req.url
    }

    if (req.url.indexOf('favicon.ico') !== -1) {
        res.end('favicon.ico');
        return;
    }

    renderer.renderToString(context, (err, html) => {
        if (err) {
            if (err.code === 404) {
                res.end('Page not found')
            } else {
                res.end('Internal Server Error')
            }
        }
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end(html);
    })

    // res.end('hello http server')
})

server.listen(3000);
server.on('error', (err) => {
    console.log('@@@', err);
})
server.on('listening', () => {
    console.log('server listening')
})