import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    return callback(null, path.resolve('public'))
  },
  filename: (request, file, callback) => {
    const time = new Date().getTime()
    const imageId = Math.round(Math.random() * 1e9)

    return callback(null, `${time}-${imageId}-${file.originalname}`)
  },
})

export const upload = multer({ storage: storage })
