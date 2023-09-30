const mongoose = require("mongoose");
const { Schema } = mongoose;


const ArticleSchema = new mongoose.Schema({

    main_title: String,
    main_content: String,
    author: { type: Schema.ObjectId, ref: "User" }, // User Schema populate, lookup
    category: { type: Schema.ObjectId, ref: "Category" }, // Category Schema populate,lookup
    categories: [{ type: Schema.ObjectId, ref: "Category" }],
    headings: [{ title: String, content: String }],
    thumbnail: String,
    tags: [String],
    image: String,
    slug: { type: String, unique: true },
    meta_title: String,
    meta_description: String,
    meta_keywords: String,
    is_published: Boolean,
    views: { type: Number, default: 0 },
    likes: [{ type: Schema.ObjectId, ref: "User" }],
    editors: [{ type: Schema.ObjectId, ref: "User" }],
    comments: [{ type: Schema.ObjectId, ref: "Comment" }],
    is_comments_moderated: { type: Boolean, default: false },
    social_media_links: {
        facebook: "",
        twitter: "",
        instagram: "",
        youtube: "",
        tiktok: "",
        linkedin: "",
        discord: "",
        medium: "",
        whatsapp: "",
        snapchat: "",
        email: "",
        website: "",
    },
    scheduled_publish_date: Date,
    content_versions: [{ version: Number, content: String, updatedAt: Date }],
    statics: {
        views: Number,
        likes: Number,
        shares: Number
    },
    email_notifications: { type: Boolean, default: false },
    custom_tags: [String],
    related_articles: [{ type: Schema.ObjectId, ref: "Article" }],
    related_links: [{ title: String, url: String }],
    language: { type: String, default: "en" },
    featured: { type: Boolean, default: false },
    featured_image: String,
    author_bio: String,
    article_type: String,
    is_premium: { type: Boolean, default: false },
    references: [{ title: String, url: String }],
    reading_time: String,
    recommended_articles: [{ type: Schema.ObjectId, ref: "Article" }],
    contact_information: {
        email: String,
        phone: String,
        address: String
    },
    data_sharing: { download_link: String, share_link: String }

}, { timestamps: true, versionKey: false, collection: "articles" });

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;