"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const initPassport_1 = require("./initPassport");
const auth_1 = __importDefault(require("./src/routes/auth"));
const content_1 = __importDefault(require("./src/routes/content"));
const wordfile_1 = __importDefault(require("./src/routes/wordfile"));
const user_1 = __importDefault(require("./src/routes/user"));
dotenv_1.default.config();
const bodyParser = require('body-parser');
const app = (0, express_1.default)();
const port = 3000;
app.use(bodyParser.json());
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
    .on('error', (error) => console.log(error));
app.use('/', auth_1.default);
app.use('/content', content_1.default);
app.use('/wordfile', wordfile_1.default);
app.use('/user', user_1.default);
