import osu from "node-os-utils";


const cpuUsage = async () => {
    return osu.cpu.usage();
}

const cpuCount = osu.cpu.count();

export {cpuUsage, cpuCount};
