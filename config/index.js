const isProd = process.env.NODE_ENV === 'production';

const config = isProd ? require('./config') : require('./config.dev');

module.exports = config;