const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/api-part");

mongoose.connection
    .once("open", () => console.log("We are connected"))
    .on('error', (error: any) => {
        console.log(error)
    })