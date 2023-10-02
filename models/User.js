const mongoose = require("mongoose");
const {Schema} = mongoose;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    email_verified:{type:Boolean,default:false},
    verification_token:String,
    is_active:{type:Boolean,default:true},
    login_history:[{timestamp:Date,ip_address:String}],   
    first_name:String,
    last_name:String,
    image:String,
    gender:{type:String,enum:['m','f']}, // m --> male , f --> female

},{timestamps:true,versionKey:false,collection:"users"});
// JWT token
UserSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}
// encrypt password hash
UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10)
    const password = this.password
    if(!password) return next()
    this.password = await bcrypt.hash(password, salt)
    return next()
  })
  
  // update password hash
  UserSchema.pre(['updateOne', 'findOneAndUpdate'], async function (next) {
    if (this._update.password) {
      const password = this._update.password
      if (password) {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        this.set('password', hash)
      }
    }
    next()
  })

const User = mongoose.model("User",UserSchema);
module.exports=User;