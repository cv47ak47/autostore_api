
const validate = function(type){

    return (req, res, next) => {

        var isSuperAdmin = req.admin.admin_level==0?true:false

        let positionSetting = req.admin.position.position_setting
    
        if(!positionSetting)
            return ReE(res, "invalid position setting", 400);
    
        if(!isSuperAdmin)
        {   
            if(!positionSetting[type])
                return ReE(res, "invalid "+type.replace(/_/g, " "), 400);
        }

        
        return next();
    }
}
module.exports.validate = validate;


