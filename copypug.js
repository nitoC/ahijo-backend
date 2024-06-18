const fs = require('fs')
const path = require('path')


let dir = path.join(__dirname, 'src/views')
let destDir = path.join(__dirname, 'dist/src/views');

fs.mkdirSync(destDir, { recursive: true });

let files = fs.readdirSync(dir)

files.forEach(file => {
    try {

        let filePath = path.join(__dirname, 'src/views', file)
        let destFilePath = path.join(__dirname, 'dist/src/views', file)
        fs.copyFileSync(filePath, destFilePath)
    } catch (err) {
        console.log(err)
    }

})

