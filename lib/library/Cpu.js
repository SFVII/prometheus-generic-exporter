"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CpuModel = exports.CpuSet = void 0;
/***********************************************************
 **  @project
 **  @file
 **  @author Brice Daupiard <brice.daupiard@nowbrains.com>
 **  @Date 01/03/2022
 **  @Description
 ***********************************************************/
const scripts_1 = require("../scripts");
const CpuSet = async () => {
    return {
        name: 'cpu',
        type: 'percentage_used',
        value: await (0, scripts_1.cpuUsage)(),
        core: scripts_1.cpuCount
    };
};
exports.CpuSet = CpuSet;
const CpuModel = () => {
    return {
        type: 'gauge',
        MetricName: 'cpu',
        MetricHelp: 'cpu usage in %',
        labelNames: ['name', 'type', 'core'],
        collect: exports.CpuSet
    };
};
exports.CpuModel = CpuModel;
