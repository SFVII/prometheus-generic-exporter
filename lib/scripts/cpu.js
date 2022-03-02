"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cpuCount = exports.cpuUsage = void 0;
const node_os_utils_1 = __importDefault(require("node-os-utils"));
const cpuUsage = async () => {
    return node_os_utils_1.default.cpu.usage();
};
exports.cpuUsage = cpuUsage;
const cpuCount = node_os_utils_1.default.cpu.count();
exports.cpuCount = cpuCount;
