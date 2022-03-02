export declare const CpuSet: () => Promise<{
    name: string;
    type: string;
    value: number;
    core: number;
}>;
export declare const CpuModel: () => {
    type: string;
    MetricName: string;
    MetricHelp: string;
    labelNames: string[];
    collect: () => Promise<{
        name: string;
        type: string;
        value: number;
        core: number;
    }>;
};
