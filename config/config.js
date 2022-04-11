require('dotenv').config();//instatiate environment variables

CONFIG = {} //Make this global to use all over the application

CONFIG.app = process.env.APP || 'dev';
CONFIG.port = process.env.PORT || '3001';

CONFIG.db_dialect = process.env.DB_DIALECT || 'mysql';
CONFIG.db_host = process.env.DB_HOST || 'eu-cdbr-west-02.cleardb.net';
CONFIG.db_port = process.env.DB_PORT || '3306';
CONFIG.db_name = process.env.DB_NAME || 'heroku_431f86e650a9374';
CONFIG.db_user = process.env.DB_USER || 'b11e6b26e6c59a';
CONFIG.db_password = process.env.DB_PASSWORD || 'b34a3428';

// CONFIG.db_dialect = process.env.DB_DIALECT || 'mysql';
// CONFIG.db_host = process.env.DB_HOST || 'localhost';
// CONFIG.db_port = process.env.DB_PORT || '3306';
// CONFIG.db_name = process.env.DB_NAME || 'name';
// CONFIG.db_user = process.env.DB_USER || 'root';
// CONFIG.db_password = process.env.DB_PASSWORD || '';

// CONFIG.jwt_encryption_consumer  = process.env.JWT_ENCRYPTION_CONSUMER || 'jwt_please_change';
// CONFIG.jwt_encryption_merchant  = process.env.JWT_ENCRYPTION_MERCHANT || 'jwt_please_change';
CONFIG.jwt_encryption_admin = process.env.JWT_ENCRYPTION_ADMIN || 'jwt_please_change';
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || '10000';

CONFIG.jwt_encryption_signage = process.env.JWT_ENCRYPTION_SIGNAGE || 'jwt_please_change';
CONFIG.jwt_expiration_signage = process.env.JWT_EXPIRATION_SIGNAGE || '10';

CONFIG.ws_port = process.env.WS_PORT || '';

CONFIG.signageList = {};

// CONFIG.jsonFilePath  = process.env.JSON_FILE_PATH || '';

CONFIG.filePath = `${process.env.FILEPATH}/video/` || 'http://178.128.48.225:8080/video/';
// CONFIG.privatefilePath  = `${process.env.PRIVATEFILEPATH}/images/` ||'http://192.168.88.163:3007/images/' ;
CONFIG.storePath = process.env.UPLOAD_IMAGE_PATH || 'public/images';
// CONFIG.storePrivatePath  = process.env.UPLOAD_PRIVATE_IMAGE_PATH || 'public/images';
// CONFIG.host = process.env.Host ||'http://192.168.88.163:3005' ;
// CONFIG.redisPort  = process.env.redisPort||6379 ;
// CONFIG.redisUrl = process.env.redisUrl||'localhost' ;
// CONFIG.redisCacheTime = process.env.redisCacheTime||30 ;

// CONFIG.CLIENT_FCM_SERVER_KEY  = process.env.CLIENT_FCM_SERVER_KEY || '';
// CONFIG.MERCHANT_FCM_SERVER_KEY  = process.env.MERCHANT_FCM_SERVER_KEY || '';
// CONFIG.RIDER_FCM_SERVER_KEY  = process.env.RIDER_FCM_SERVER_KEY || '';
// CONFIG.SMS_DEBUG = process.env.SMS_DEBUG || false;
// CONFIG.API_VERSION  = process.env.API_VERSION || '0';
// CONFIG.use_trio  = process.env.use_trio || false;

