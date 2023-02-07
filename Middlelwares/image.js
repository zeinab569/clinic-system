const multer =require('multer');
const path=require('path');

const storage=multer.diskStorage({
     destination:function(req,file,cb){
           cb(null,'./uploads/');
     },
   filename:function(req,file,cb){
       return cb(null,`${file.filename}_${Date.now()}${path.extname(file.originalname)}`)//return call back with error(null) or success withe file name ,time with milsc,and extention of file
   }
})


const upload =multer({storage:storage});



module.exports=upload;