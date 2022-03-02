"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiskModel = exports.DiskSet = void 0;
const scripts_1 = require("../scripts");
/***********************************************************
 **  @project
 **  @file
 **  @author Brice Daupiard <brice.daupiard@nowbrains.com>
 **  @Date 01/03/2022
 **  @Description
 ***********************************************************/
const check_disk_space_1 = __importDefault(require("check-disk-space"));
const DiskSet = (montPoint) => async () => {
    montPoint.push('/');
    const stats = [];
    for (const drive of montPoint) {
        const info = await (0, check_disk_space_1.default)(drive);
        stats.push({
            name: 'hard_drive',
            type: 'percentage_disk_usage',
            display_name: drive,
            size: (0, scripts_1.bytesTo)(Number(info.size), 3),
            used: (0, scripts_1.bytesTo)(info.free, 3),
            value: Number(((info.free / info.size) * 100).toFixed(2))
        });
    }
    return stats;
};
exports.DiskSet = DiskSet;
const DiskModel = (montPoint = []) => {
    return {
        type: 'gauge',
        MetricName: 'disk',
        MetricHelp: 'disk consumption in %',
        labelNames: ['name', 'type', 'display_name', 'used', 'size'],
        collect: (0, exports.DiskSet)(montPoint)
    };
};
exports.DiskModel = DiskModel;
