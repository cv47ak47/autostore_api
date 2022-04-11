const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Admin = require('../models').Admin;
const AdminPosition = require('../models').AdminPosition;
const Company = require('../models').Company;
const Signage = require('../models').Signage;

// const ConsumerAuth = function(passport){
//     var opts = {};
//     opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//     opts.secretOrKey = CONFIG.jwt_encryption_consumer;

//     passport.use(new JwtStrategy(opts, async function(jwt_payload, done){
       
//         let err, admin;
//         console.log("show me"+jwt_payload.admin_id)
//         // if(jwt_payload.admin_id!=null){
//         //     console.log("show me"+jwt_payload.admin_id)
//         //     [err, admin] = await to(Admin.findById(jwt_payload.admin_id));

//         // }


//         if(err) return done(err, false);

 

//         if(admin) 
//         {
//             // Set consumer language
//             consumer.lang = lang
//             return done(null, consumer);

//         }   
//         // Error msg handling multiple language 
//         return done("admin not found", null);
        
//     }));
// }

//module.exports.ConsumerAuth = ConsumerAuth;

const AdminAuth = function(passport){
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = CONFIG.jwt_encryption_admin;


    
    passport.use(new JwtStrategy(opts, async function(jwt_payload, done){
        
        let err, admin;
        [err, admin] = await to(
                        Admin.findOne({
                            where: {admin_id:jwt_payload.admin_id},
                            include: [{
                                model: AdminPosition,
                                as: 'position',
                                attributes: ['company_id','position_id','position_setting'],
                                include: [{ model:Company,as:"company", required: true}]
                            }],
                            
                        })
                    );

        if(err) return done(err, false);

        if(admin) 
        {
                return done(null, admin); 
        }

        return done('Admin Not Found!', false);
        
    }));
}
module.exports.AdminAuth = AdminAuth;


const SignageAuth = function(passport){
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromUrlQueryParameter("token");
    opts.secretOrKey = CONFIG.jwt_encryption_signage;

   // console.log("show me",opts)
    
    passport.use(new JwtStrategy(opts, async function(jwt_payload, done){
        //console.log("show me paylaod ",JSON.stringify(jwt_payload))
        let err, signage;
        [err, signage] = await to(Signage.findById(jwt_payload.signage_id));

        if(err) return done(err, false);

        if(signage) 
        {
                return done(null, signage); 
        }

        return done('Signage Not Found!', false);
        
    }));
}
module.exports.SignageAuth = SignageAuth;