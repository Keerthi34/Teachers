var mongoose=require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var AutoIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;


var schema= new Schema({
    "School_Id" : {type:String},
    "Teacher_Id":{type:String},
    "First_Name": {type:String, required:true},
    "Last_Name": {type:String, required:true},
    "Gender":{type:String},
    "Date_of_birth": {type:String},
    "Age": {type:Number},
    "Qualification": {type:String, required:true},
    "Experience": {type:String, required:true},
    "Package": {type:String, required:true},
     "Address":{type:String, required:true},
    "Phone_Number":  {type:Number},
    "Previous_School":{type:String}

})

module.exports=mongoose.model('teacher_details',schema);
