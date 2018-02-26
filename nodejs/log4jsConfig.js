const path = require('path');
module.exports = {
    appenders: {
        allin: {
            type: 'file',
            filename: path.resolve(__dirname, '../logs/all-in-logs.log'),
            maxLogSize: 10485760,
            backups: 5,
            compress: true
        },
        http: {
            type: 'dateFile',
            filename: path.resolve(__dirname, '../logs/http-logs.log'),
            pattern: '.yyyy-MM-dd',
            compress: true
        },
        out: {
            type: 'stdout'
        }
    },
    categories: {
        default: {
            appenders: ['allin'],
            level: 'info'
        },
        http: {
            appenders: ['http'],
            level: 'info'
        },
        out: {
            appenders: ['out'],
            level: 'debug'
        }
    }
}