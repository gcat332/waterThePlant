"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moment_1 = __importDefault(require("moment"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send(`Hello, ${(0, moment_1.default)()}`);
});
app.post("/api", (req, res) => {
    let json = req.body;
    res.send(`body data : ${json}`);
    console.log(json);
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
