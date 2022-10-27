"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const diagnoses_1 = __importDefault(require("./src/routes/diagnoses"));
const patients_1 = __importDefault(require("./src/routes/patients"));
const app = (0, express_1.default)();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/diagnoses', diagnoses_1.default);
app.use('/api/patients', patients_1.default);
app.get('/api/ping', (_req, res) => {
    res.send('pong');
});
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running at port: ${PORT}`);
});
