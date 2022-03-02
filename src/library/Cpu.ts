/***********************************************************
 **  @project
 **  @file
 **  @author Brice Daupiard <brice.daupiard@nowbrains.com>
 **  @Date 01/03/2022
 **  @Description
 ***********************************************************/
import {cpuCount, cpuUsage} from "../scripts";

export const CpuSet = async () => {
    return {
        name : 'cpu',
        type : 'percentage_used',
        value : await cpuUsage(),
        core : cpuCount
    }
}

export const CpuModel = () => {
    return {
        type: 'gauge',
        MetricName: 'cpu',
        MetricHelp: 'cpu usage in %',
        labelNames: ['name', 'type', 'core'],
        collect: CpuSet
    }
}
