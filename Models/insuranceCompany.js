const mongoose=require("mongoose");


const insuranceCompanySchema=new mongoose.Schema({
   _id:Number,
    companyName:{
    type:String,
    unique:true,
    required:true,
    matchRegx:/^[a-zA-Z]+((['_,. -][a-zA-Z ])?[a-zA-Z]*)*$/,
   },
   remainingamount:
   {
    type:Number,
   }  

},
{_id:false}
)
mongoose.model('insuranceCompany',insuranceCompanySchema) 