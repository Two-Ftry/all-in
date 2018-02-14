var http = require('http');
// var SSR = require('vue-server-renderer');
const path = require('path')
var Vue = require('vue');
var fs = require('fs');
const express = require('express')
const resolve = file => path.resolve(__dirname, file)

const app = express()

const isProd = process.env.NODE_ENV === 'production'

// var renderer = SSR.createRenderer('./dist/vue-ssr-server-bundle.js', {
//     // template: fs.readFileSync('./index.template.html', 'utf-8')
// });
const { createBundleRenderer } = require('vue-server-renderer')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')
const renderer = createBundleRenderer(require('./dist/vue-ssr-server-bundle.json'), {
    template: fs.readFileSync('./index.template.html', 'utf-8'),
    clientManifest
})

const serve = (path, cache) => express.static(resolve(path), {
    maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
  })
  
// app.use(compression({ threshold: 0 }))
//   app.use(favicon('./public/logo-48.png'))
app.use('/dist', serve('./dist', true))
app.use('/public', serve('./public', true))


app.get('*', (req, res) => {
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
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})


// var server = http.createServer((req, res) => {

//     // var app = new Vue({
//     //     template: '<div>hello vue-ssr</div>'
//     // });
//     const context = {
//         url: req.url
//     }

//     if (req.url.indexOf('favicon.ico') !== -1) {
//         res.end('favicon.ico');
//         return;
//     }

//     renderer.renderToString(context, (err, html) => {
//         if (err) {
//             if (err.code === 404) {
//                 res.end('Page not found')
//             } else {
//                 res.end('Internal Server Error')
//             }
//         }
//         res.writeHead(200, {
//             'Content-Type': 'text/html'
//         });
//         res.end(html);
//     })

//     // res.end('hello http server')
// })

// server.listen(3000);
// server.on('error', (err) => {
//     console.log('@@@', err);
// })
// server.on('listening', () => {
//     console.log('server listening')
// })