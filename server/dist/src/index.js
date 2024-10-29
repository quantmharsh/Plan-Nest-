"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const searchRoutes_1 = __importDefault(require("./routes/searchRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const teamRoutes_1 = __importDefault(require("./routes/teamRoutes"));
// Route Imports
// Configurations
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
dotenv_1.default.config();
app.use((0, morgan_1.default)("common"));
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.get('/', (req, res) => {
    res.send("Welcome to Home Route");
});
app.use('/projects', projectRoutes_1.default);
app.use("/tasks", taskRoutes_1.default);
app.use("/search", searchRoutes_1.default);
app.use("/users", userRoutes_1.default);
app.use("/teams", teamRoutes_1.default);
//Converting to Number  to get rid of typescript error because using AWS for deployment 
const port = Number(process.env.PORT) || 3000;
//0.0.0.0 is to solve EC2 network   issue. 
app.listen(port, "0.0.0.0", () => console.log(`Server started on port ${port}`));
