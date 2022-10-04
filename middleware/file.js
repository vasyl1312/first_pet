const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images') //папка куди складуємо всі файли
  },
  filename: function (req, file, cb) {
    //cb(null, new Date().toISOString() + '-' + file.originalname) //а тут унікальні назви файлів
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  },
})

const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png'] //лімітуємо розширення завантажених файлів

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

module.exports = multer({ storage, fileFilter })
