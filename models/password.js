var mongoose=require('mongoose');
var Schema = mongoose.Schema;


var schema= new Schema({
    "Id" : {type:String},

    "Password":{type:String}
    })

module.exports=mongoose.model('teacherpassword',schema);
