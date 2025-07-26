import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
    filename: (req, file, cb) => {
    //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
})

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Images only!');
    }
  }

  const upload = multer({
    storage
  });

  router.post('/upload', upload.single('image'), (req, res) => {
    res.send({
        message: 'File uploaded successfully',
        image: '/${req.file.path}',
    })
  })




export default router;