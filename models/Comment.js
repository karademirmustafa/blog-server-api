const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentSchema = new mongoose.Schema({

text:String,
author:{type:Schema.ObjectId,ref:"User"},
parent_comment:{type:Schema.ObjectId,ref:"Comment"},
favorited_by:{type:Schema.ObjectId,ref:"User"},
article:{type:Schema.ObjectId,ref:"Article"},
likes:[{type:Schema.ObjectId,ref:"User"}],
dislikes:[{type:Schema.ObjectId,ref:"User"}],
replies:[CommentSchema],
reports:[{reason:String,reported_by:{type:Schema.ObjectId,ref:"User"}}]

}, { timestamps: true, versionKey: false, collection: "comments" });