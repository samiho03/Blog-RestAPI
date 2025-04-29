const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12,(error,salt)=>{                               //bcrypt.genSalt() කියන function එක Salt එකක් හදනවා. Salt කියන්නේ random string එකක්, password එකේ සුරක්ෂිතතාව වැඩි කරන්න යොදා ගන්නවා.මෙහිදී 12 කියන්නේ "cost factor" එක. Cost factor එක වැඩි නම් Hashing එක secure වීම වැඩිවෙනවා (කොහොමත් තරමක් slow වෙයි).
            if(error){
                return reject(error)
            }

            bcrypt.hash(password,salt,(error,hash)=>{             //මෙහිදි bcrypt.hash() function එක password එක සහ salt එක එකට combine කරලා secure hash එකක් හදනවා.
                if(error){
                    return reject(error)                          //Error එකක් තිබුනොත්, Promise එක reject වෙනවා.
                }
                resolve(hash)                       //සාර්ථක නම්, Promise එක resolve කරලා hash එක return කරනවා.
            })
        })
    })
}

module.exports = hashPassword;