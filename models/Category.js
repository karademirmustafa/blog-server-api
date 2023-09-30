const mongoose = require("mongoose");

const { Schema } = mongoose;

const CategorySchema = new mongoose.Schema({
    name:String,
    description:String,
    parent_category:{
        type:Schema.ObjectId,ref:"Category"
    },
    icon:String,
    color:String,
    keywords:[String],
    tags:[String],
    addional_info:String,
    order:Number,
    priority:Boolean,
    content:String,
    related_categories:[{type:Schema.ObjectId,ref:"Category"}]
}, { timestamps: true, versionKey: false, collection: "categories" });


const Category = mongoose.model("Category",CategorySchema);

module.exports=Category;