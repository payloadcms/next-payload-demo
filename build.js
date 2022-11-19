const path = require('path')
const copyRecursiveSync = require('./copyRecursiveSync');

// Copy handlers into /api
copyRecursiveSync(path.resolve(__dirname, './handlers'), path.resolve(__dirname, './api'))

// Copy built admin JS into /public/admin
copyRecursiveSync(path.resolve(__dirname, './build'), path.resolve(__dirname, './public/admin'))

process.exit(0)
