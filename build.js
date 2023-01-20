const path = require('path')
const copyRecursiveSync = require('./copyRecursiveSync');

const args = process.argv.slice(2); // nodejs command line args are an array that begin at the third item
const apiOutputPath = args[0] || './api'

// Copy handlers into /api
copyRecursiveSync(path.resolve(__dirname, './handlers/api'), path.resolve(__dirname, apiOutputPath))

// Copy built admin JS into /public/admin
copyRecursiveSync(path.resolve(__dirname, './build'), path.resolve(__dirname, './public/admin'))

process.exit(0)
