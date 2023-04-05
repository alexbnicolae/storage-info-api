"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const content_schema_1 = __importDefault(require("./src/models/content/content.schema"));
const passport_1 = __importDefault(require("passport"));
const initPassport_1 = require("./initPassport");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
//init passport
(0, initPassport_1.initPassport)(app);
// CORS policy
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server is running');
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
mongoose_1.default.connect(`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.m7cqcio.mongodb.net/${process.env.MONGO_DB_DATABASE_NAME}?retryWrites=true&w=majority`);
mongoose_1.default.connection
    .once("open", () => console.log("We are connected"))
    .on('error', (error) => {
    console.log(error);
});
content_schema_1.default.find().then(data => console.log(data));
// will go access 3rd party to get permission to access the data
app.get("/user/login/facebook", passport_1.default.authenticate("facebook", { scope: ["email"] })); //define the scope to also access the email
app.get("/user/login/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] })); //define this scope to have access to the email
//once permission to exchange data is granted, a callback will be fired
app.get("/user/login/facebook/callback", passport_1.default.authenticate("facebook", { failureRedirect: "/auth/facebook" }), 
// Redirect user back to the mobile app using deep linking
(req, res) => {
    res.redirect(`storageInfoApp://app/login?firstName=${req.user.firstName}/lastName=${req.user.lastName}/email=${req.user}`);
});
app.get("/user/login/google/callback", passport_1.default.authenticate("google", { failureRedirect: "/auth/google" }), 
// Redirect user back to the mobile app using deep linking
(req, res) => {
    res.redirect(`storageInfoApp://app/login?firstName=${req.user.firstName}/lastName=${req.user.lastName}/email=${req.user.email}/token=${req.user.token}`);
});
app.get("/logout", function (req, res) {
    console.log("here");
    req.session.destroy(function () {
        res.redirect("storageInfoApp://");
    });
});
