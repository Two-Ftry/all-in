/**
 * 记录日志
 */

const log4js = require('log4js');

let config = require('./log4jsConfig.js');

const isProd = process.env.NODE_ENV === 'production';

log4js.configure(config);

let logger = log4js.getLogger('allin');

if (!isProd) {
    logger = log4js.getLogger('out');
}

module.exports = logger;