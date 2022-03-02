"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bytesTo = void 0;
/***********************************************************
 **  @project
 **  @file
 **  @author Brice Daupiard <brice.daupiard@nowbrains.com>
 **  @Date 01/03/2022
 **  @Description
 ***********************************************************/
var IUnit;
(function (IUnit) {
    IUnit[IUnit["Bytes"] = 0] = "Bytes";
    IUnit[IUnit["KB"] = 1] = "KB";
    IUnit[IUnit["MB"] = 2] = "MB";
    IUnit[IUnit["GB"] = 3] = "GB";
})(IUnit || (IUnit = {}));
const bytesTo = (bytes, unit = 2) => {
    // 0 == bytes;
    // 1 = KB
    // 2 = MB
    // 3 = GB
    return Number(Math.round(bytes / Math.pow(1024, 2)).toFixed(2));
};
exports.bytesTo = bytesTo;
