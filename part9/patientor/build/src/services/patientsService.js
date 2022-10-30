"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../data/patients"));
const uuid_1 = require("uuid");
const getAll = () => {
    return patients_1.default;
};
const getOne = (id) => {
    const patient = patients_1.default.find((p) => p.id === id);
    return patient;
};
const add = (p) => {
    const patient = Object.assign({ 
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
        id: (0, uuid_1.v1)() }, p);
    patients_1.default.push(patient);
    return patient;
};
exports.default = {
    getAll,
    getOne,
    add
};
