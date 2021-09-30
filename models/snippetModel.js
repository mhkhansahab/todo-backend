const mongoose = require("mongoose");

const snippetSchema = new mongoose.Schema({
    title : {type : String},
    description : {type : String},
    date : {type : String}
},{
    timestamps : true
})

const snippetModel = mongoose.model("snippet", snippetSchema);

module.exports = snippetModel;