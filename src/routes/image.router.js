const { getAll, create, getOne, remove, update } = require('../controllers/image.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT')
const upload = require('../utils/multer')

const imageRouter = express.Router();

imageRouter.route('/images')
    .get(verifyJWT, getAll)
    .post(verifyJWT, upload.single('image'), create);

imageRouter.route('/images/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, remove)
    .put(update);

module.exports = imageRouter;