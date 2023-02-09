const mongoose=require("mongoose");

const AutoIncrement = require('mongoose-sequence')(mongoose);

const schemas = require("../Middlelwares/Schemas");


const clinicSchema=new mongoose.Schema({
   _id:Number,
   clinicName:{
    type:String,
    unique:true,
    required:true,
    matchRegx:/^[a-zA-Z]+((['_,. -][a-zA-Z ])?[a-zA-Z]*)*$/,
   },
     contact:schemas.contactSchema,
     location:schemas.addressSchema,
     schedule:schemas.scheduleSchema,

},
{_id:false}
)//end of schema
clinicSchema.plugin(AutoIncrement,
  {id:"clinicId",inc_field:"_id",start_seq:100});

// clinicSchema.plugin(AutoIncrement);
//module.exports=mongoose.model("doctor",doctorSchema);
mongoose.model("clinic",clinicSchema);