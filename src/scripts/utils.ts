/***********************************************************
 **  @project
 **  @file
 **  @author Brice Daupiard <brice.daupiard@nowbrains.com>
 **  @Date 01/03/2022
 **  @Description
 ***********************************************************/
enum IUnit {
    Bytes,
    KB,
    MB,
    GB
}
export const bytesTo = (bytes:number, unit : IUnit = 2)  => {
    // 0 == bytes;
    // 1 = KB
    // 2 = MB
    // 3 = GB
    return Number(Math.round(bytes / Math.pow(1024, 2)).toFixed(2));
}
