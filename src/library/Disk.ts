import {bytesTo} from "../scripts";

/***********************************************************
 **  @project
 **  @file
 **  @author Brice Daupiard <brice.daupiard@nowbrains.com>
 **  @Date 01/03/2022
 **  @Description
 ***********************************************************/
import checkDiskSpace from 'check-disk-space'

export const DiskSet = (montPoint: string[]) => async () => {
    montPoint.push('/');
    const stats = [];
    for (const drive of montPoint) {
        const info = await checkDiskSpace(drive)
        stats.push({
            name: 'hard_drive',
            type: 'percentage_disk_usage',
            display_name: drive,
            size: bytesTo(Number(info.size), 3),
            used: bytesTo(info.free, 3),
            value: Number(((info.free / info.size) * 100).toFixed(2))
        })
    }
    return stats;
}


export const DiskModel = (montPoint: string[] = []) => {
    return {
        type: 'gauge',
        MetricName: 'disk',
        MetricHelp: 'disk consumption in %',
        labelNames: ['name', 'type', 'display_name', 'used', 'size'],
        collect: DiskSet(montPoint)
    }
}
