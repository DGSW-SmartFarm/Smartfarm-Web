const express = require('express');
const router=express.Router();
router.use(express.static('public'));
const controller = require('/operate');

router.get('/', controller.index);

//router.get('/:id', controller.show);
//router.delete('/:id', controller.destroy);
//router.post('/', controller.create);

module.exports=router;