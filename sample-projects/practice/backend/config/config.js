var env=process.env.NODE_ENV || 'development';
var config=require("./config.json");

const envconfig=config[env];
Object.keys(envconfig).forEach(key=>process.env[key]=envconfig[key]);