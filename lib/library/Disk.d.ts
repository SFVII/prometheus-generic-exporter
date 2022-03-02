export declare const DiskSet: (montPoint: string[]) => () => Promise<{
    name: string;
    type: string;
    display_name: string;
    size: number;
    used: number;
    value: number;
}[]>;
export declare const DiskModel: (montPoint?: string[]) => {
    type: string;
    MetricName: string;
    MetricHelp: string;
    labelNames: string[];
    collect: () => Promise<{
        name: string;
        type: string;
        display_name: string;
        size: number;
        used: number;
        value: number;
    }[]>;
};
