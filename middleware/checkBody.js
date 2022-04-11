const { check } = require('express-validator');
const moment = require('moment');

chkAdminLogin = [
    check('username')
        .not().isEmpty().withMessage('Username cannot be empty'),
    check('password')
        .isLength({ min: 8,max:32 }).withMessage('Password must be minimum 8 and maximum 32 characters')
        .not().isEmpty().withMessage('Password cannot be empty')
]

chkCreateAdminPosition = [
    check('admin_position')
        .not().isEmpty().withMessage('admin_position cannot be empty'),
    check('position_setting').custom((data, {req}) => {
            //  console.log("req "+req.body.is_track)
                  try {
                     return JSON.parse(data); 
                  } catch (error) {
                      console.log(error)
                      return false
                  }
          }).withMessage('position_setting must be json'),
    check('company_id')
          .not().isEmpty().withMessage('company_id cannot be empty'),

]

chkEditAdminPosition = [
    check('position_setting').optional().custom((data, {req}) => {
            //  console.log("req "+req.body.is_track)

                //this one checking is it array JSON []
                //   try {
                //      var arr =  JSON.parse(data); 
                //      return Array.isArray(arr)
                //   } catch (error) {
                //       console.log(error)
                //       return false
                //   }

                try {
                    return JSON.parse(data); 
                 } catch (error) {
                     console.log(error)
                     return false
                 }
          }).withMessage('position_setting must be json'),
]

chkCreateAdmin = [
    check('username')
        .not().isEmpty().withMessage('Username cannot be empty'),
    check('password')
        .isLength({ min: 8,max:32 }).withMessage('Password must be minimum 8 and maximum 32 characters')
        .not().isEmpty().withMessage('Password cannot be empty'),
    check('first_name')
        .not().isEmpty().withMessage('first_name cannot be empty'),
    check('last_name')
        .not().isEmpty().withMessage('last_name cannot be empty'),
    check('position_id')
        .not().isEmpty().withMessage('position_id cannot be empty'),
    
]

chkEditAdmin = [
    check('admin_id')
        .not().isEmpty().withMessage('admin_id cannot be empty'),
    check('password').optional()
        .isLength({ min: 8,max:32 }).withMessage('Password must be minimum 8 and maximum 32 characters'),
    check('publish').optional()
        .isBoolean().withMessage('publish must be boolean')
]

chkSignageList = [

]

chkAddSignage = [
    check('company_id')
        .isLength({ min: 1,max:100 }).withMessage('company_id must be minimum 1 and maximum 100 characters')
        .not().isEmpty().withMessage('company_id cannot be empty'),
    check('name')
        .isLength({ min: 1,max:100 }).withMessage('Name must be minimum 1 and maximum 100 characters')
        .not().isEmpty().withMessage('Name cannot be empty'),
    check('location')
        .isLength({ min: 1,max:100 }).withMessage('location must be minimum 1 and maximum 100 characters')
        .not().isEmpty().withMessage('location cannot be empty'),
    check('fps')
        .isInt().withMessage('Fps must be integer')
        .not().isEmpty().withMessage('Fps cannot be empty'),
    check('enable_camera')
        .isBoolean().withMessage('enable_camera must be boolean')
        .not().isEmpty().withMessage('enable_camera cannot be empty'),
    check('enable_tracking')
        .isBoolean().withMessage('enable_tracking must be boolean')
        .not().isEmpty().withMessage('enable_tracking cannot be empty'),
    // check('category')
    //     .isJSON({ min: 1,max:1000 }).withMessage('Category must be json, ex:-{"age":true,"gender":true,"spec":true,"beard":true}-')
    //     .not().isEmpty().withMessage('Category cannot be empty')
    check('category').optional().custom((data, {req}) => {
      //  console.log("req "+req.body.is_track)
      
        if(req.body.category=="null")
        {   req.body.category ="[]"
            return true
        }
        else if(req.body.enable_tracking == "true")
        {
           
            try {
                var arr = JSON.parse(data);
                return Array.isArray(arr)
            } catch (error) {
                console.log(error)
                return false
            }

        }
        else
        {
            return true
        }
        
    }).withMessage('Category must be array')
                 

]

chkSignageRegister = [
    check('mac')
        .isLength({ min: 1,max:50 }).withMessage('mac must be minimum 1 and maximum 50 characters')
        .not().isEmpty().withMessage('mac cannot be empty'),
    check('code')
        .isLength({ min: 1,max:200 }).withMessage('code must be minimum 1 characters')
        .not().isEmpty().withMessage('code cannot be empty')

]

chkSignageLogin = [
    check('mac')
        .isLength({ min: 1,max:50 }).withMessage('Mac must be minimum 1 and maximum 50 characters')
        .not().isEmpty().withMessage('Mac cannot be empty'),
    check('code')
        .isLength({ min: 1,max:200 }).withMessage('code must be minimum 1 characters')
        .not().isEmpty().withMessage('code cannot be empty')
]

///sepcial use validation in controller!!//
chkAddAds = [
    check('company_id')
        .isLength({ min: 1,max:100 }).withMessage('company_id must be minimum 1 and maximum 100 characters')
        .not().isEmpty().withMessage('company_id cannot be empty'),
    check('display_name')
        .isLength({ min: 1,max:50 }).withMessage('display_name must be minimum 1 and maximum 50 characters')
        .not().isEmpty().withMessage('display_name cannot be empty'),
    check('fps')
        .isInt().withMessage('Fps must be integer'),       
    check('tracking')
        .isBoolean().withMessage('enable_tracking must be boolean'),
    check('category').custom((data, {req}) => {
        //  console.log("req "+req.body.is_track)
    
                try {
                    console.log("data asd asd "+data)
                    var arr = JSON.parse(data);
                    return Array.isArray(arr)
                } catch (error) {
                    console.log(error)
                    return false
                }
         
            
        }).withMessage('Category must be array')
]

chkSendAds = [
    check('ads_id')
    .custom((data, {req}) => {
        //  console.log("req "+req.body.is_track)
              try {
                  var arr = JSON.parse(data);
                  return Array.isArray(arr)
              } catch (error) {
                  console.log(error)
                  return false
              }
           
      }).withMessage('ads_id must be array'),
    check('signage_id').custom((data, {req}) => {
            //  console.log("req "+req.body.is_track)
                  try {
                      var arr = JSON.parse(data);
                      return Array.isArray(arr)
                  } catch (error) {
                      console.log(error)
                      return false
                  }
               
          }).withMessage('signage_id must be array')
]

chkSignageEdit = [
    check('signage_id')
        .isLength({ min: 1,max:100 }).withMessage('signage_id must be minimum 1 and maximum 100 characters')
        .not().isEmpty().withMessage('signage_id cannot be empty'),
    check('name').optional()
        .isLength({ min: 1,max:100 }).withMessage('Name must be minimum 1 and maximum 100 characters')
        ,
    check('mac').optional()
        .isLength({ min: 1,max:100 }).withMessage('mac must be minimum 1 and maximum 100 characters')
        ,
    check('location').optional()
        .isLength({ min: 1,max:100 }).withMessage('location must be minimum 1 and maximum 100 characters')
        ,
    check('fps').optional()
        .isInt().withMessage('Fps must be integer')
        ,
    check('enable_camera').optional()
        .isBoolean().withMessage('enable_camera must be boolean')
       ,
    check('registered').optional()
        .isBoolean().withMessage('registered must be boolean')
        ,
    check('enable_tracking').optional()
        .isBoolean().withMessage('enable_tracking must be boolean')
        ,
    // check('category')
    //     .isJSON({ min: 1,max:1000 }).withMessage('Category must be json, ex:-{"age":true,"gender":true,"spec":true,"beard":true}-')
    //     .not().isEmpty().withMessage('Category cannot be empty')
    check('category').custom((data, {req}) => {
      //  console.log("req "+req.body.is_track)
        if(req.body.enable_tracking == "true")
        {
           
            try {
                var arr = JSON.parse(data);
                return Array.isArray(arr)
            } catch (error) {
                console.log(error)
                return false
            }

        }
        else
        {
            return true
        }
        
    }).withMessage('Category must be array'),
    check('publish').optional()
        .isBoolean().withMessage('publish must be boolean')
        
                 

]

chkAdsEdit = [
    check('ads_id')
    .isLength({ min: 1,max:100 }).withMessage('ads_id must be minimum 1 and maximum 100 characters')
    .not().isEmpty().withMessage('ads_id cannot be empty'),
    check('display_name').optional()
    .isLength({ min: 1,max:100 }).withMessage('display_name must be minimum 1 and maximum 100 characters'),
    check('fps').optional()
    .isLength({ min: 1,max:100 }).withMessage('fps must be minimum 1 and maximum 100 characters'),
    check('tracking').optional()
    .isBoolean().withMessage('tracking must be boolean'),
    check('publish').optional()
        .isBoolean().withMessage('publish must be boolean'),
    check('category').optional().custom((data, {req}) => {
        //  console.log("req "+req.body.is_track)
    
            try {
                    var arr = JSON.parse(data);
                    return Array.isArray(arr)
                } catch (error) {
                    console.log(error)
                    return false
                }
         
            
    }).withMessage('Category must be array'),
    check('adver_id').optional()
        .isLength({ min: 1,max:100 }).withMessage(' must be minimum 1 and maximum 100 characters'),
    check('status').optional()
    .isInt().withMessage('status must be integer').custom((data, {req}) => { 
       
        if(req.body.status==5&&!req.body.reject_reason)
        {
            return false
        }

        return true
    }).withMessage('reject_reason be insert'),

]


chkNewCompany = [
    check('company_name')
    .isLength({ min: 1,max:100 }).withMessage('company_name must be minimum 1 and maximum 100 characters'),
    check('description').optional()
]

editCompany = [
    check('company_id')
        .isLength({ min: 1,max:100 }).withMessage('company_id must be minimum 1 and maximum 100 characters')
        .not().isEmpty().withMessage('company_id cannot be empty'),
    check('company_name').optional()
    .isLength({ min: 1,max:100 }).withMessage('company_name must be minimum 1 and maximum 100 characters'),
    check('description').optional(),
    check('approver').optional().custom((data, {req}) => {
            try {
                    var arr = JSON.parse(data);
                    return Array.isArray(arr)
                } catch (error) {
                    console.log(error)
                    return false
                }        
    }).withMessage('approver must be array'),
    check('publish').optional()
    .isBoolean().withMessage('publish must be boolean')
]

getAdsList =[
    check('ads_approval').optional()
    .isBoolean().withMessage('ads_approval must be boolean'),
    check('edit_ads').optional()
    .isBoolean().withMessage('edit_ads must be boolean'),
    check('rejected_list').optional()
    .isBoolean().withMessage('rejected_list must be boolean') 
]


chkCreatePackage = [
    check('company_id')
        .isLength({ min: 1,max:100 }).withMessage('company_id must be minimum 1 and maximum 100 characters')
        .not().isEmpty().withMessage('company_id cannot be empty'),
    check('name')
        .isLength({ min: 1,max:100 }).withMessage('name must be minimum 1 and maximum 100 characters')
        .not().isEmpty().withMessage('name cannot be empty'),
    check('ads_list').custom((data, {req}) => {
        try {
            var arr = JSON.parse(data);
            return Array.isArray(arr)
        } catch (error) {
            console.log(error)
            return false
        }
    }).withMessage('ads_list must be array')
]

chkEditPackage = [
    check('package_id')
        .isLength({ min: 1,max:100 }).withMessage('package_id must be minimum 1 and maximum 100 characters')
        .not().isEmpty().withMessage('package_id cannot be empty'),
    check('name')
        .optional()
        .isLength({ min: 1,max:100 }).withMessage('name must be minimum 1 and maximum 100 characters')
        .not().isEmpty().withMessage('name cannot be empty'),
    check('ads_list').optional().custom((data, {req}) => {
        try {
            var arr = JSON.parse(data);
            return Array.isArray(arr)
        } catch (error) {
            console.log(error)
            return false
        }
    }).withMessage('ads_list must be array')
]

chkGroup = [
    check('name')
        .isLength({ min: 1,max:100 }).withMessage('name must be minimum 1 and maximum 100 characters')
        .not().isEmpty().withMessage('name cannot be empty'),
    check('signage_list').custom((data, {req}) => {
        try {
            var arr = JSON.parse(data);
            return Array.isArray(arr)
        } catch (error) {
            console.log(error)
            return false
        }
    }).withMessage('signage_list must be array or json')
]

chkEditGroup = [
    check('group_id')
        .isLength({ min: 1,max:100 }).withMessage('group_id must be minimum 1 and maximum 100 characters')
        .not().isEmpty().withMessage('group_id cannot be empty'),
    check('name')
        .optional()
        .isLength({ min: 1,max:100 }).withMessage('name must be minimum 1 and maximum 100 characters')
        .not().isEmpty().withMessage('name cannot be empty'),
    check('signage_list').optional().custom((data, {req}) => {
        try {
            var arr = JSON.parse(data);
            return Array.isArray(arr)
        } catch (error) {
            console.log(error)
            return false
        }
    }).withMessage('ads_list must be array')
]

chkAssignPackage = [
    check('group_id')
        .isLength({ min: 1,max:100 }).withMessage('package_id must be minimum 1 and maximum 100 characters')
        .not().isEmpty().withMessage('group_id cannot be empty'),
    check('package_id')
        .isLength({ min: 1,max:100 }).withMessage('package_id must be minimum 1 and maximum 100 characters')
        .not().isEmpty().withMessage('package_id cannot be empty'),
]

chkUpdateSchedule= [
    check('schedule').custom((data, {req}) => {
        try {
            var arr = JSON.parse(data);
            return arr
        } catch (error) {
            console.log(error)
            return false
        }
    }).withMessage('schedule must be array object [{}]'),
    check('group_id')
        .isLength({ min: 1,max:100 }).withMessage('group_id must be minimum 1 and maximum 100 characters')
        .not().isEmpty().withMessage('group_id cannot be empty')
]

getSchedule= [
    check('group_id')
        .isLength({ min: 1,max:100 }).withMessage('group_id must be minimum 1 and maximum 100 characters')
        .not().isEmpty().withMessage('group_id cannot be empty')
]

chkAdvertiser = [
    check('name')
        .isLength({ min: 1,max:100 }).withMessage('name must be minimum 1 and maximum 100 characters')
        .not().isEmpty().withMessage('name cannot be empty'),
    check('description')
        .isLength({ min: 1,max:100 }).withMessage('name must be minimum 1 and maximum 100 characters')
        .not().isEmpty().withMessage('name cannot be empty'),
    check('email')
        .isLength({ min: 1,max:100 }).withMessage('email must be minimum 1 and maximum 100 characters')
        .not().isEmpty().withMessage('email cannot be empty'),
    check('contact')
        .isLength({ min: 1,max:100 }).withMessage('contact must be minimum 1 and maximum 100 characters')
        .not().isEmpty().withMessage('contact cannot be empty')
]

chkEditAdvertiser = [
    check('id')
        .isLength({ min: 1,max:100 }).withMessage('group_id must be minimum 1 and maximum 100 characters')
        .not().isEmpty().withMessage('group_id cannot be empty'),
    check('name').optional()
        .isLength({ min: 1,max:100 }).withMessage(' must be minimum 1 and maximum 100 characters'),
    check('description').optional()
        .isLength({ min: 1,max:100 }).withMessage(' must be minimum 1 and maximum 100 characters'),
    check('email')
    .optional().isLength({ min: 1,max:100 }).withMessage('email must be minimum 1 and maximum 100 characters')
        .not().isEmpty().withMessage('email cannot be empty'),
    check('contact')
    .optional().isLength({ min: 1,max:100 }).withMessage('contact must be minimum 1 and maximum 100 characters')
        .not().isEmpty().withMessage('contact cannot be empty')
]



chkEditLayout = [
    check('grid_setting').custom((data, {req}) => {
        //  console.log("req "+req.body.is_track)
              try {
                 return JSON.parse(data); 
              } catch (error) {
                  console.log(error)
                  return false
              }
      }).withMessage('grid_setting must be json'),
]