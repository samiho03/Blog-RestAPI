const express = require('express')
const router = express.Router()
const isAuth = require('../middlewares/isAuth')
const { postController } = require('../controllers')
const { addPostValidator, updatePostValidator, idValidator } = require('../validator/post')
const validate = require('../validator/validate')

router.post("/", isAuth, addPostValidator , validate, postController.addPost)

router.put("/:id", isAuth, updatePostValidator, idValidator, validate, postController.updatePost)

router.delete("/:id", isAuth, idValidator, validate , postController.deletePost)

router.get("/", isAuth, postController.getPosts)

router.get("/:id", isAuth, idValidator, validate, postController.getPost)

module.exports = router