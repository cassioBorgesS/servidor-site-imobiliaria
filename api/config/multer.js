const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    storage: multer.diskStorage({
        destination: (req,file,cb) =>{
            cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (erro, hash) => {
                if(erro) cb(erro)

                const fileName = `${hash.toString('hex')}-${file.originalname}`
                cb(null, fileName)
            })
        }
    }),
    limits: {
        fileSize: 10 * 1024 * 1024
    },
    fileFilter : (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/jpg',
            'image/png',
            'image/gif',
            'image/svg'
        ]
        
        if(allowedMimes.includes(file.mimetype)){
            cb(null, true)
        } else{
            cb(new Error('Invalid file type'))
        }
    }
}