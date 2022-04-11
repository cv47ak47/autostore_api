var express = require('express');
var router = express.Router();


const testController = require('./../controller/testController');

router.get('/test', testController.test);
// router.post('/login',testController.insertData));

//router.post("/", testController.create);
// router.get("/getallclientdata", testController.getallclientdata);
// router.get("/getclientdata/:id", testController.getclientdata);
// router.post("/postclientdata", testController.postclientdata);
// router.post("/updateclientdata", testController.updateclientdata);
// router.get("/getallsignagedata", testController.getallsignagedata);
// router.post("/postsignagedata", testController.postsignagedata);
// router.post("/updatesignagedata", testController.updatesignagedata);

router.get("/getallstockdata", testController.getallstockdata);
router.get("/getallsupervisordata", testController.getallsupervisordata);
router.get("/getallgriddata", testController.getallgriddata);
router.get("/getallagvdata", testController.getallagvdata);
router.get("/getallalgodata", testController.getallalgodata);
router.get("/getallstockbindata", testController.getallstockbindata);
router.get("/getallstoragedata", testController.getallstoragedata);
router.get("/getallstatisticdata", testController.getallstatisticdata);
router.get("/getgriddata/:id", testController.getgriddata);
router.get("/getalgodata/:id", testController.getalgodata);
router.post("/updategriddata", testController.updategriddata);
router.post("/updatealgodata/:id", testController.updatealgodata);
router.post("/updateagvdata", testController.updateagvdata);
router.post("/addstockdata", testController.addstockdata);
router.post("/addstockbindata", testController.addstockbindata);
router.post("/addstatisticdata", testController.addstatisticdata);
router.post("/deletestockdata/:id", testController.deletestockdata);

module.exports = router;