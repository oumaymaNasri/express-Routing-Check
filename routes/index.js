var express = require('express');
var router = express.Router();

function isAvailable(d,h){
  if(d===0 || d===6 || h<9 || h>17)
    return false
  return true
}

const checkAvailabilityMiddeleware= function(req,res,next) {
  let date=new Date();
  let day=date.getDay()
  let hour=date.getHours()

  if(!isAvailable(day,hour))
    {
      res.redirect('/notavailable')
      res.end()
    }
  else
    next()
}

/* GET home page. */
router.get('/',checkAvailabilityMiddeleware, function(req, res, next) {
  res.render('index');
});

/*GET Service page. */

router.get('/service',checkAvailabilityMiddeleware,(req,res,next)=>{
  res.render('service')
});

router.get('/contact',checkAvailabilityMiddeleware,(req,res,next)=>{
  res.render('contact')
})

router.get('/notavailable',(req,res,next)=>{
  res.render('notavailable')
})

module.exports = router;
