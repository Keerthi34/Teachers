var mongoose=require('mongoose');
var Schema = mongoose.Schema;


var schema= new Schema({
    "Id" : {type:String},
    "School_Id" : {type:String},
      "Email_id":{type:String},
      "type":{type:String},

    "Password":{type:String}
    })

module.exports=mongoose.model('registrations',schema);
