
const { validationResult } = require('express-validator');
const Stock = require('../models').stock;
const Supervisor = require('../models').supervisor;
const Grid = require('../models').grid;
const Algorithm = require('../models').algorithm;
const Stock_Bin = require('../models').stock_bin;
const Storage = require('../models').storage;
const Agv = require('../models').agv;
const Statistic = require('../models').statistic;

const Layout = require('../models').layout;
const Linking = require('../models').linking;

const test = async function (req, res) {

  var err, AdminDetail
  [err, AdminDetail] = await to(Stock.findOne({
    where: {
      admin_id: 1
    }
  }));

  if (!AdminDetail) { return ReE(res, "error", 400); }//false to get data
  return ReS(res, '', { data: AdminDetail }); //success response
}

const getallstockdata = async function (req, res) {

  try {
    const stock_data = await Stock.findAll({});
    res.status(201).send(stock_data)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

const getallsupervisordata = async function (req, res) {

  try {
    const supervisor_data = await Supervisor.findAll({});
    res.status(201).send(supervisor_data)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

const getallstockbindata = async function (req, res) {

  try {
    const all_stock_bin = await Stock_Bin.findAll({});
    res.status(201).send(all_stock_bin)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

const getallstoragedata = async function (req, res) {

  try {
    const all_storage_data = await Storage.findAll({});
    res.status(201).send(all_storage_data)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

const getallstatisticdata = async function (req, res) {

  try {
    const all_statistic_data = await Statistic.findAll({});
    res.status(201).send(all_statistic_data)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}



const updategriddata = async function (req, res) {
  try {
    const update_data = await Grid.update({
      grid_depth: req.body.grid_depth,
      grid_length: req.body.grid_length,
      grid_width: req.body.grid_width,
      input_port_location: req.body.input_port_location,
      output_port_location: req.body.output_port_location,
      supervisor_id: req.body.supervisor_id
    }, {
      where: { supervisor_id: req.body.supervisor_id },
    });
    res.status(201).send(update_data)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

const getallgriddata = async function (req, res) {

  try {
    const all_grid_data = await Grid.findAll({});
    res.status(201).send(all_grid_data)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

const getallagvdata = async function (req, res) {

  try {
    const all_agv_data = await Agv.findAll({});
    res.status(201).send(all_agv_data)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

const getallalgodata = async function (req, res) {

  var all_algorithm_data;
  try {
    const all_algorithm_data = await Algorithm.findAll({});
    res.status(201).send(all_algorithm_data)
    //  res.setHeader(message, value)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

const getgriddata = async function (req, res) {

  var grid_data;
  const { id } = req.params;
  try {
    const grid_data = await Grid.findOne({
      where: { supervisor_id: req.params.id },
    });
    res.status(201).send(grid_data)
    //  res.setHeader(message, value)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

const getalgodata = async function (req, res) {

  var algorithm_data;
  const { id } = req.params;
  try {
    const algorithm_data = await Algorithm.findOne({
      where: { supervisor_id: req.params.id },
    });
    res.status(201).send(algorithm_data)
    //  res.setHeader(message, value)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

const updatealgodata = async function (req, res) {
  try {
    const { id } = req.params;
    const update_algo_data = await Algorithm.update({
      algorithm_name: req.body.algorithm_name,
      algorithm_type: req.body.algorithm_type,
      implementation: req.body.implementation,
      supervisor_id: req.body.supervisor_id
    }, {
      where: { algorithm_id: req.params.id },
    });
    res.status(201).send(update_algo_data)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

const updateagvdata = async function (req, res) {
  try {
    const update_agv_data = await Agv.update({
      current_pos: req.body.current_pos,
    }, {
      where: { agv_id: req.body.agv_id },
    });
    res.status(201).send(update_agv_data)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

const addstockdata = async function (req, res) {
  try {
    const new_stock_data = await Stock.create({
      stock_id: req.body.stock_id,
      stock_name: req.body.stock_name,
      stock_code: req.body.stock_code,
      stock_type: req.body.stock_type,
      stock_amount: req.body.stock_amount,
      stock_description: req.body.stock_description,
      stock_weight: req.body.stock_weight,
      arrival_time: req.body.arrival_time,
      export_time: req.body.export_time,
    });
    res.status(201).send(new_stock_data)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

const addstockbindata = async function (req, res) {
  try {
    const new_stock_bin_data = await Stock_Bin.create({
      stock_id: req.body.stock_id,
      storage_id: req.body.storage_id,
      stock_bin_code: req.body.stock_bin_code,
    });
    res.status(201).send(new_stock_bin_data)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

const addstatisticdata = async function (req, res) {
  try {
    const new_statistic_data = await Statistic.create({
      statistic_id: req.body.statistic_id,
      path: req.body.path,
      path_length: req.body.path_length,
      computational_time: req.body.computational_time,
      algorithm_id: req.body.algorithm_id,
      agv_id: req.body.agv_id,
    });
    res.status(201).send(new_statistic_data)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

const deletestockdata = async function (req, res) {
  // const { id } = req.params;
  try {
    const delete_stock = await Stock.deleteAll({
      where: { stock_id: req.body.stock_id },
    });
    res.status(201).send(UpdateData)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}



const getallclientdata = async function (req, res) {

  var ads_layout;
  try {
    const ads_layout = await Layout.findAll({});
    res.status(201).send(ads_layout)
    //res.setHeader(message, value)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

const getclientdata = async function (req, res) {

  var one_ads_layout;
  const { id } = req.params;
  try {
    const one_ads_layout = await Layout.findOne({
      where: { layout_id: req.params.id },
    });
    res.status(201).send(one_ads_layout)
    //  res.setHeader(message, value)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

const postclientdata = async function (req, res) {
  try {
    const clientData = await Layout.create({
      layout_name: req.body.layout_name,
      console: req.body.console,
      navigationwidth: req.body.navigationwidth,
      classarray: req.body.classarray,
      elements: req.body.elements,
      layout: req.body.layout,
      length: req.body.length,
      preset: req.body.preset,
      grid_content: req.body.content,
    });
    res.status(201).send(clientData)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

const updateclientdata = async function (req, res) {
  try {
    const UpdateData = await Layout.update({
      layout_name: req.body.name,
      console: req.body.console,
      navigationwidth: req.body.navigationwidth,
      classarray: req.body.classarray,
      elements: req.body.elements,
      layout: req.body.layout,
      length: req.body.length,
      preset: req.body.preset,
      grid_content: req.body.content,
    }, {
      where: { layout_name: req.body.name },
    });
    res.status(201).send(UpdateData)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}



const getallsignagedata = async function (req, res) {

  try {
    const link = await Linking.findAll({});
    res.status(201).send(link)
    //  res.setHeader(message, value)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

const postsignagedata = async function (req, res) {
  try {
    const signageData = await Linking.create({
      signage_id: req.body.signage_id,
      layout_id: req.body.layout_id,
    });
    res.status(201).send(signageData)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

const updatesignagedata = async function (req, res) {
  try {
    const UpdateData = await Linking.update({
      signage_id: req.body.signage_id,
      layout_id: req.body.layout_id,
    }, {
      where: { signage_id: req.body.signage_id },
    });
    res.status(201).send(UpdateData)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

module.exports.test = test;
// module.exports.getallclientdata = getallclientdata;
// module.exports.getclientdata = getclientdata;
// module.exports.postclientdata = postclientdata;
// module.exports.postsignagedata = postsignagedata;
// module.exports.getallsignagedata = getallsignagedata;
// module.exports.updateclientdata = updateclientdata;
// module.exports.updatesignagedata = updatesignagedata;

module.exports.getallstockdata = getallstockdata;
module.exports.getallsupervisordata = getallsupervisordata;
module.exports.getallgriddata = getallgriddata;
module.exports.getallagvdata = getallagvdata;
module.exports.getallalgodata = getallalgodata;
module.exports.getallstockbindata = getallstockbindata;
module.exports.getallstoragedata = getallstoragedata;
module.exports.getallstatisticdata = getallstatisticdata;
module.exports.getgriddata = getgriddata;
module.exports.getalgodata = getalgodata;
module.exports.updategriddata = updategriddata;
module.exports.updatealgodata = updatealgodata;
module.exports.updateagvdata = updateagvdata;
module.exports.addstockdata = addstockdata;
module.exports.addstockbindata = addstockbindata;
module.exports.addstatisticdata = addstatisticdata;
module.exports.deletestockdata = deletestockdata;
