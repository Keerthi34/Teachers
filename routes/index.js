var express = require('express');
var router = express.Router();
var winston = require('winston');
var Teacher= require('../models/teacher');

/*Logger*/
winston.add(
  winston.transports.File,{
    filename: 'teacher.log',
    level: 'info',
    json: 'true',
    eol: 'rn',
    timestamp: true
  }
)
winston.log('info',"Info level")


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Get all teacher records*/
router.get('/fetch', function(req, res, next) {
  winston.log('info',"Info: Get all records")
  console.log("info");
  Teacher.find({},function(err,data){
      if(err)
      res.status(500).send(err);
      else {
        res.status(200).json(data);
      }
  })
});


/* Get teachers details of a particular school */
router.get('/getteachers/:School_Id',function(req,res,next){
  winston.log('info',"Info: Get teachers from particular school")
  Teacher.find({School_Id: req.params.School_Id},function(err,data){
    if(err)
    res.status(500).send(err);
    else {
      res.status(200).json(data);
    }
  })
})


/*Get particular teacher details using school and teacher Id */
router.get('/getteacher/:School_Id/:Teacher_Id',function(req,res,next){
  winston.log('info',"Info: Get particular teacher details")
  Teacher.find({School_Id: req.params.School_Id,Teacher_Id:req.params.Teacher_Id},function(err,data){

    if(err)
    res.status(500).send(err);
    else {
      res.status(200).json(data);
    }
  })
})


/* Delete  a particular teacher details */
router.get('/delete/:School_Id/:Teacher_Id',function(req,res,next){
  winston.log('info',"Info: Delete particular teacher")
  Teacher.remove({School_Id: req.params.School_Id,Teacher_Id:req.params.Teacher_Id},function(err,data){
    console.log('deleted');
    if(err)
    res.status(404).send(err);
    else
    res.status(200).json(data);
  });
})


/* Add teachers */
router.post('/add',function(req,res,next){
  winston.log('info',"Info level")
  var t=new Teacher({
    School_Id:req.body.School_Id,
    Teacher_Id:1,
    First_Name: req.body.First_Name,
    Last_Name: req.body.Last_Name,
    Date_of_birth:req.body.Date_of_birth,
    Age: req.body.Age,
    Qualification:  req.body.Qualification,
    Experience: req.body.Experience,
    Package: req.body.Package,
    Address:req.body.Address,
    Phone_Number:  req.body.Phone_Number,
  })
  t.save(function(err,suc){
    if(err)
    res.send(err)
    else {

      Teacher.count({}, function( err, count){

        var sc="T"+count++
        Teacher.findOneAndUpdate({_id:suc.id}, {Teacher_Id:sc}, {upsert:true}, function(err, doc){
    if (err) return res.status(500).send( { error: err });
    return res.status(201).send({"Message":"Created", type:"internal"});
})

})
    //  res.send(suc)
    }
    function getNextSequenceValue(sequenceName){

      var sequenceDocument = db.counters.findOneAndUpdate(
        { "_id" : sequenceName },
         { $inc : { sequence_value : 1 } },
         { new : true }
       );
   return sequenceDocument.sequence_value;
 }

})

})


/* Update particular teacher details */
router.put('/update/:School_Id/:Teacher_Id', function(req,res,next){
  winston.log('info',"Info level")
var query={School_Id: req.params.School_Id,
             Teacher_Id:req.params.Teacher_Id};
      Teacher.update(query, req.body, function(err,data){
                   if(err) res.status(404).json(err);
                   else {
                     res.status(202).json(data)
                   }

  })
})



module.exports = router;
