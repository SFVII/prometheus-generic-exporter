/***********************************************************
 **  @project
 **  @file
 **  @author Brice Daupiard <brice.daupiard@nowbrains.com>
 **  @Date 01/03/2022
 **  @Description
 ***********************************************************/
declare enum IUnit {
    Bytes = 0,
    KB = 1,
    MB = 2,
    GB = 3
}
export declare const bytesTo: (bytes: number, unit?: IUnit) => number;
export {};
