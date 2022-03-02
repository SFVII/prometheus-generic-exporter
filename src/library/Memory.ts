/***********************************************************
 **  @project
 **  @file
 **  @author Brice Daupiard <brice.daupiard@nowbrains.com>
 **  @Date 01/03/2022
 **  @Description
 ***********************************************************/

import {bytesTo} from "../scripts"
import os from "os";

export const MemorySet = () => {
    return [{
        name: 'memory',
        type: 'percentage_memory_used',
        total: bytesTo(os.totalmem(), 2),
        free: bytesTo(os.freemem(), 2),
        value: Number( (100 - (os.freemem() / os.totalmem()) * 100).toFixed(2))
    }]
//    (montant partiel / montant total) x 100

}


export const MemoryModel = () => {
    return {
        type: 'gauge',
        MetricName: 'memory',
        MetricHelp: 'memory consumption in %',
        labelNames: ['name', 'type', 'free', 'total'],
        collect: MemorySet
    }
}
