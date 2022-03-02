"use strict";
/***********************************************************
 **  @project
 **  @file
 **  @author Brice Daupiard <brice.daupiard@nowbrains.com>
 **  @Date 01/03/2022
 **  @Description
 ***********************************************************/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryModel = exports.MemorySet = void 0;
const scripts_1 = require("../scripts");
const os_1 = __importDefault(require("os"));
const MemorySet = () => {
    return [{
            name: 'memory',
            type: 'percentage_memory_used',
            total: (0, scripts_1.bytesTo)(os_1.default.totalmem(), 2),
            free: (0, scripts_1.bytesTo)(os_1.default.freemem(), 2),
            value: Number((100 - (os_1.default.freemem() / os_1.default.totalmem()) * 100).toFixed(2))
        }];
    //    (montant partiel / montant total) x 100
};
exports.MemorySet = MemorySet;
const MemoryModel = () => {
    return {
        type: 'gauge',
        MetricName: 'memory',
        MetricHelp: 'memory consumption in %',
        labelNames: ['name', 'type', 'free', 'total'],
        collect: exports.MemorySet
    };
};
exports.MemoryModel = MemoryModel;
