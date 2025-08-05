const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {
    let filePath = ''
    let contentType = 'text/html'

    
    if (req.url.endsWith('.css')) {
        filePath = path.join(__dirname, req.url)
        contentType = 'text/css'
    }
    
    else {
        filePath = './pages/'
        if (req.url === '/') {
            filePath += 'index.html'
            res.statusCode = 200
        } else if (req.url === '/about') {
            filePath += 'about.html'
            res.statusCode = 200
        } else if (req.url === '/contact') {
            filePath += 'contact.html'
            res.statusCode = 200
        } else if (req.url === '/product') {
            filePath += 'product.html'
            res.statusCode = 200
        } else {
            filePath += 'error.html'
            res.statusCode = 404
        }
    }

    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log(err)
            res.statusCode = 500
            res.end('Server Error')
        } else {
            res.setHeader('Content-Type', contentType)
            res.end(data)
        }
    })
})

server.listen(3001, 'localhost', () => {
    console.log('Listening on http://localhost:3001')
})
