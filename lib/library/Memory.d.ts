/***********************************************************
 **  @project
 **  @file
 **  @author Brice Daupiard <brice.daupiard@nowbrains.com>
 **  @Date 01/03/2022
 **  @Description
 ***********************************************************/
export declare const MemorySet: () => {
    name: string;
    type: string;
    total: number;
    free: number;
    value: number;
}[];
export declare const MemoryModel: () => {
    type: string;
    MetricName: string;
    MetricHelp: string;
    labelNames: string[];
    collect: () => {
        name: string;
        type: string;
        total: number;
        free: number;
        value: number;
    }[];
};
