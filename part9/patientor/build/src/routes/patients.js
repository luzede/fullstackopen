"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = __importDefault(require("../utils"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientsService_1.default.getAll());
});
router.post('/', (req, res) => {
    try {
        const newPatient = (0, utils_1.default)(req.body);
        res.send(patientsService_1.default.add(newPatient));
    }
    catch (error) {
        let errorMessage = 'Something went wrong \n';
        if (error instanceof Error) {
            console.log(error.message);
            errorMessage += error.message;
        }
        res.status(404).send(errorMessage);
    }
});
exports.default = router;
