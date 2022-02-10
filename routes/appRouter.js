let express = require('express');
let router = express.Router();


let controller=require('../controller/controller')
router.get('/',  controller.getData);

module.exports = router;
