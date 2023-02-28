"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const ditributor_1 = __importDefault(require("./routes/ditributor"));
dotenv_1.default.config();
const URL = process.env.URL;
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use((0, express_session_1.default)({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000 * 60 * 24,
    },
}));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.send('Application works!');
});
app.use('/dst', ditributor_1.default);
app.listen(PORT, () => {
    console.log(`Application started on this port ${PORT}!`);
});
//# sourceMappingURL=server.js.map