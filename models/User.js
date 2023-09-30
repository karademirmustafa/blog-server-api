const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    username:String,
    email:{type:String,unique:true},
    password:String,
    role:{type:String,enum:['admin','author',"editor"]},
    full_name:String,
    avatar:String,
    bio:String,
    birthdate:Date,
    website:String,
    social_media_links:{facebook:String,twitter:String,instagram:String,linkedin:String},
    followers:[{type:Schema.ObjectId,ref:"User"}],
    following:[{type:Schema.ObjectId,ref:"User"}],
    likedPosts:[{type:Schema.ObjectId,ref:"Article"}],
    notification_enabled:Boolean,
    email_verified:Boolean,
    verification_token:String,
    is_active:Boolean,
    login_history:[{timestamp:Date,ip_address:String}],   
    first_name:String,
    last_name:String,
    image:String,
    gender:{type:String,enum:['m','f']}, // m --> male , f --> female

},{timestamps:true,versionKey:false,collection:"users"});


const User = mongoose.model("User",UserSchema);
module.exports=User;