const multer = require('multer')
const path = require('path')
const generateCode = require('../utils/generateCode')

const storage = multer.diskStorage({

    destination: (req, file, callback)=>{
        callback(null, "./uploads")
    },

    filename: (req, file, callback)=> {
        //original_file_name_12_digit_random_number.ext

        const originalName = file.originalname
        const extension = path.extname(originalName)
        const filename = originalName.replace(extension, "")
        const compressedfilename = filename.split(" ").join("_")
        const lowercasefilename = compressedfilename.toLowerCase()
        const code = generateCode(12)
        const finalFile = `${lowercasefilename}_${code}${extension}`

        callback(null, finalFile)
    }
})

const upload = multer ({
    storage,
    fileFilter: (req,file,callback)=>{
        const mimetype = file.mimetype

        if(
            mimetype === "image/png" ||
            mimetype === "image/jpg" ||
            mimetype === "image/jpeg" ||
            mimetype === "application/pdf"
        ) {
            callback(null, true)
        }else{
            callback(new Error("Invalid file type. Only jpg, jpeg, png and pdf file allowed"))
        }
        
    }
})

module.exports = upload