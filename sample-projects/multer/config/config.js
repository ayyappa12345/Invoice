var env=process.env.NODE_ENV || 'development';

const config=require("./config.json");

const envconfig=config[env];

Object.keys(envconfig).forEach(keys=>process.env[keys]=envconfig[keys])