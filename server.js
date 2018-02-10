var http = require('http');
var SSR = require('vue-server-renderer');
var Vue = require('vue');
var fs = require('fs');

var renderer = SSR.createRenderer({
    template: fs.readFileSync('./index.template.html', 'utf-8')
});

var server = http.createServer((req, res) => {

    var app = new Vue({
        template: '<div>hello vue-ssr</div>'
    });

    renderer.renderToString(app, (err, html) => {
        if (err) {
            res.end('error happen', err);
            throw err;
        }
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end(html);
    })

    res.end('hello http server')
})

server.listen(3000);
server.on('error', (err) => {
    console.log('@@@', err);
})
server.on('listening', () => {
    console.log('server listening')
})