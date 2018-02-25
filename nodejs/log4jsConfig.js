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
        out: {
            type: 'stdout'
        }
    },
    categories: {
        default: {
            appenders: [ 'allin' ],
            level: 'info'
        },
        out: {
            appenders: ['out'],
            level: 'debug'
        }
    }
}