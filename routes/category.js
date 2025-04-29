const express = require('express')
const router = express.Router()
const {categoryController} = require("../controllers")
const {addCategoryValidator, idValidator} = require("../validator/category")
const validate = require("../validator/validate")
const isAuth = require("../middlewares/isAuth")         //isAuth unsures that you are a valid authenticated user
const isAdmin = require("../middlewares/isAdmin")

router.post(
    "/",
    isAuth,
    isAdmin,
    addCategoryValidator , 
    validate,  
    categoryController.addCategory
)

router.put("/:id", isAuth, isAdmin, idValidator, validate ,categoryController.updateCategory)

router.delete("/:id", isAuth,isAdmin, idValidator, validate, categoryController.deleteCategory)

router.get("/", isAuth, categoryController.getCategories)

router.get("/:id", isAuth, idValidator ,validate , categoryController.getCategory)

module.exports = router